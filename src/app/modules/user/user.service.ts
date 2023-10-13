import {
  Appointment,
  BloodDonor,
  Doctor,
  DonorRequest,
  DonorReview,
  Payment,
  Prescription,
  Prisma,
  User,
  UserRole,
} from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { IUpdatedUserRequestData, IUserFilter } from './user.interface'
import { IPagination } from '../../../interface/pagination'
import { calculatePagination } from '../../../helper/paginationHalper'
import { IFilterResponse } from '../../../interface/userFilteResponse'
import { UserSearchAbleFiled } from './user.constant'

const getAllFromDB = async (
  filters: IUserFilter,
  options: IPagination,
): Promise<IFilterResponse<User[]>> => {
  const { page, limit, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      OR: UserSearchAbleFiled.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.user.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      bloodDonor: true,
      doctor: true,
      // user: true,
      // permanent_Address: true,
      // present_Address: true,
      // education: true,
      profile: {
        include: {
          permanent_Address: true,
          present_Address: true,
          education: true,
        },
      },
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.user.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getByIdFromDB = async (id: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: { id },
    include: {
      bloodDonor: true,
      doctor: {
        include: {
          doctorServices: {
            include: {
              serviceSalt: true,
            },
          },
        },
      },
      // user: true,
      // permanent_Address: true,
      // present_Address: true,
      // education: true,
      profile: {
        include: {
          permanent_Address: true,
          present_Address: true,
          education: true,
        },
      },
    },
  })
}
const updateByIdIntoDB = async (
  authUserId: string,
  payload: Partial<IUpdatedUserRequestData>,
) => {
  const user = await prisma.user.findFirst({
    where: { id: authUserId },
    include: {
      bloodDonor: true,
      doctor: true,
      profile: {
        include: {
          permanent_Address: true,
          present_Address: true,
          education: true,
        },
      },
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User not found!')
  }
  if (payload && payload.profile) {
    await prisma.profile.update({
      where: {
        user_id: user.id,
      },
      data: payload.profile,
    })
  }
  if (payload && payload?.presentAddress) {
    await prisma.presentAddress.update({
      where: {
        profile_Id: user?.profile?.id,
      },
      data: payload.presentAddress,
    })
  }

  if (payload && payload?.permanentAddress) {
    await prisma.permanentAddress.update({
      where: {
        profile_Id: user?.profile?.id,
      },
      data: payload.permanentAddress,
    })
  }
  if (payload && payload.education) {
    await prisma.education.update({
      where: {
        id: payload.education.id,
      },
      data: payload.education,
    })
  }

  return user
}

const bloodDonorRequest = async (authUserId: string, payload: DonorRequest) => {
  const user = await prisma.user.findFirst({
    where: { id: authUserId },
    include: {
      profile: true,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  const donor = await prisma.bloodDonor.findFirst({
    where: {
      id: payload.donorId,
    },
    include: {
      user: true,
    },
  })
  if (!donor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Blood donor Not Found')
  }
  payload.userId = user.id
  const result = await prisma.$transaction(async transactionClient => {
    const donorRequests = await transactionClient.donorRequest.create({
      data: payload,
    })

    await transactionClient.bloodDonor.update({
      where: {
        id: donor.id,
      },
      data: {
        totalPendingRequest: {
          increment: 1,
        },
      },
    })

    const message = `${user.profile?.user_name} donor request to you. his need ${payload.quantity} beg blood and donned date ${payload.donnetDate}.`
    await transactionClient.notification.create({
      data: {
        message,
        userId: donor.user.id,
      },
    })
    // Broadcast the new notification to all connected clients
    // io.emit('new-notification', notification);

    return donorRequests
  })

  return result
}

const myDonorRequest = async (
  authUserId: string,
  pagination: IPagination,
): Promise<IFilterResponse<DonorRequest[]>> => {
  const { limit, skip, page } = calculatePagination(pagination)
  console.log(pagination)
  const result = await prisma.donorRequest.findMany({
    skip,
    take: limit,
    where: {
      userId: authUserId,
    },
    include: {
      donor: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
      user: {
        include: {
          profile: true,
        },
      },
    },
    // orderBy:
    //   pagination.sortBy && pagination.sortOrder
    //     ? {
    //         [pagination.sortBy]: pagination.sortOrder,
    //       }
    //     : {
    //       user: "dsce"
    //     },
  })
  const total = await prisma.donorRequest.count({
    where: {
      userId: authUserId,
    },
  })
  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  }
}
const myDonorReviewFromDB = async (
  authUserId: string,
  pagination: IPagination,
): Promise<IFilterResponse<DonorReview[]>> => {
  const { limit, skip, page } = calculatePagination(pagination)
  const result = await prisma.donorReview.findMany({
    take: limit,
    skip,
    where: { userId: authUserId },
    include: {
      bloodDonor: {
        include: {
          user: true,
        },
      },
    },
    orderBy:
      pagination.sortBy && pagination.sortOrder
        ? {
            [pagination.sortBy]: pagination.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.donorReview.count({
    where: { userId: authUserId },
  })
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const myAppointment = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<Appointment[]>> => {
  const { limit, skip, page } = calculatePagination(options)
  const result = await prisma.appointment.findMany({
    take: limit,
    skip,
    where: {
      userId: authUserId,
    },
    include: {
      service: {
        include: {
          GoogleMeet: true,
        },
      },
      doctor: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  })
  const total = await prisma.appointment.count({
    where: {
      userId: authUserId,
    },
  })

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  }
}
const myPrescription = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<Prescription[]>> => {
  const { limit, skip, page } = calculatePagination(options)
  const result = await prisma.prescription.findMany({
    take: limit,
    skip,
    where: {
      userId: authUserId,
    },
    include: {
      user: true,
      doctor: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
      appointment: {
        include: {
          doctor: true,
          service: true,
        },
      },
    },
  })
  const total = await prisma.prescription.count({
    where: {
      userId: authUserId,
    },
  })
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  }
}

const myPaymentList = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<Payment[]>> => {
  const { limit, skip, page } = calculatePagination(options)
  const result = await prisma.payment.findMany({
    take: limit,
    skip,
    where: {
      userId: authUserId,
    },
    include: {
      service: {
        include: {
          doctor: {
            include: {
              doctorServices: {
                include: {
                  serviceOffers: true,
                  serviceSalt: true,
                },
              },
            },
          },
          appointments: true,
        },
      },
    },
  })
  const total = await prisma.payment.count({
    where: {
      userId: authUserId,
    },
  })

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  }
}

const filtersDoctorFromDB = async (
  filters: {
    district?: string
    experience?: string
    specialist?: string
    searchTerm?: string
  },
  pagination: IPagination,
): Promise<IFilterResponse<User[]>> => {
  const { district, experience, specialist } = filters

  console.log(filters)
  const { skip, limit, page } = calculatePagination(pagination)

  const whereConditions: Prisma.UserWhereInput = {
    profile: {
      user: {
        role: UserRole.Doctor,
        doctor: {
          experience: experience,
          specialist,
        },
      },
      present_Address: {
        district: district,
      },
    },
  }

  // if (searchTerm) {
  //   whereConditions.OR = bloodDonorSearchAbleFiled.map(searchFiled => ({
  //     [searchFiled]: {
  //       contains: searchTerm,
  //       mode: 'insensitive',
  //     },
  //   }))
  // }

  const donors = await prisma.user.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      pagination.sortBy && pagination.sortOrder
        ? {
            [pagination.sortBy]: pagination.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      doctor: true,
      profile: {
        include: {
          present_Address: true,
        },
      },
    },
  })
  const total = await prisma.user.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: donors,
  }
}
const userProfile = async (user: {
  role: string
  user_id: string
}): Promise<User | BloodDonor | Doctor | null> => {
  console.log(user)
  if (user.role === UserRole.User) {
    return await prisma.user.findFirst({
      where: {
        id: user.user_id,
      },
      include: {
        profile: {
          include: {
            permanent_Address: true,
            present_Address: true,
            education: true,
          },
        },
      },
    })
  } else if (user.role === UserRole.BloodDonor) {
    return await prisma.bloodDonor.findFirst({
      where: {
        user_id: user.user_id,
      },
      include: {
        user: {
          include: {
            profile: {
              include: {
                permanent_Address: true,
                present_Address: true,
                education: true,
              },
            },
          },
        },
      },
    })
  } else if (user.role === UserRole.Doctor) {
    return await prisma.doctor.findFirst({
      where: { user_id: user.user_id },
      include: {
        user: {
          include: {
            profile: {
              include: {
                present_Address: true,
                permanent_Address: true,
                education: true,
              },
            },
          },
        },
      },
    })
  } else {
    return await prisma.user.findFirst({
      where: {
        id: user.user_id,
      },
      include: {
        profile: {
          include: {
            permanent_Address: true,
            present_Address: true,
            education: true,
          },
        },
      },
    })
  }
}
export const UserService = {
  userProfile,
  filtersDoctorFromDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  bloodDonorRequest,
  myDonorRequest,
  myDonorReviewFromDB,
  myAppointment,
  myPrescription,
  myPaymentList,
}
