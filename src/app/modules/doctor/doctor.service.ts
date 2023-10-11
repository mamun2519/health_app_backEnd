import {
  Appointment,
  DoctorService,
  GoogleMeet,
  Payment,
  Prisma,
  User,
  UserRole,
  Withdraw,
  meetingEnumStatus,
} from '@prisma/client'
import prisma from '../../../prisma/prisma'
import { currentDate, generateSalt, matchSlatTime } from './doctor.utils'
import {
  ICreatedDoctorServiceData,
  IDoctorServiceFilter,
} from './doctor.interface'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { IPagination } from '../../../interface/pagination'
import { calculatePagination } from '../../../helper/paginationHalper'
import { doctorServiceSearchAbleFiled } from './doctor.constant'
import { IFilterResponse } from '../../../interface/userFilteResponse'

const createServiceIntoDB = async (
  data: ICreatedDoctorServiceData,
  authUserId: string,
): Promise<DoctorService> => {
  const doctor = await prisma.user.findFirst({
    where: { id: authUserId },
    include: {
      doctor: true,
    },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.OK, 'Doctor Not found!')
  }
  data.service.doctorId = doctor.doctor?.id as string
  const result = await prisma.$transaction(async transactionClient => {
    const DocService = await transactionClient.doctorService.create({
      data: data.service,
      include: {
        serviceSalt: true,
      },
    })

    const DoctorSlat = generateSalt(
      data.salt.startTime,
      data.salt.endTime,
      Number(data.salt.duration),
    )
    console.log(DoctorSlat)
    data.salt.serviceId = DocService.id
    await transactionClient.serviceSalt.create({
      data: {
        serviceId: DocService.id,
        duration: data.salt.duration,
        startTime: data.salt.startTime,
        endTime: data.salt.endTime,
        salt: DoctorSlat,
      },
    })
    return DocService
  })

  // todo: when doctor create a his service. then show notification "service create successfully"
  return result
}
const getAllFromDB = async (
  filters: IDoctorServiceFilter,
  options: IPagination,
): Promise<IFilterResponse<DoctorService[]>> => {
  const { page, limit, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      OR: doctorServiceSearchAbleFiled.map(filed => ({
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

  const whereConditions: Prisma.DoctorServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.doctorService.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      serviceOffers: true,
      serviceReviews: true,
      serviceSalt: true,
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
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.doctorService.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}
const myServiceFromDB = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<DoctorService[]> | null> => {
  const { page, limit, skip } = calculatePagination(options)
  const doctor = await prisma.user.findFirst({
    where: { id: authUserId },
    include: {
      doctor: true,
    },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.OK, 'Doctor Not found!')
  }
  const result = await prisma.doctorService.findMany({
    skip,
    take: limit,
    where: {
      doctorId: doctor?.doctor?.id,
    },
    include: {
      serviceOffers: true,
      serviceReviews: true,
      serviceSalt: true,
      doctor: true,
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
  if (result.length == 0) {
    throw new Send_API_Error(StatusCodes.BAD_REQUEST, 'Your service not found')
  }
  const total = await prisma.doctorService.count({
    where: { doctorId: doctor?.doctor?.id },
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
const getByIdFromDB = async (
  id: string,
  date: string,
): Promise<DoctorService | null> => {
  const cUrrentDate = date == undefined ? currentDate() : date
  console.log(cUrrentDate)
  const searchAppointment = await prisma.appointment.findMany({
    where: {
      bookingDate: cUrrentDate,
    },
  })

  // console.log(searchAppointment)

  const doctor = await prisma.doctorService.findFirst({
    where: { id },
    include: {
      serviceOffers: true,
      serviceReviews: true,
      serviceSalt: true,
    },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.OK, 'Doctor service Not found!')
  }
  const result = await prisma.doctorService.findFirst({
    where: {
      id,
    },
    include: {
      doctor: {
        include: {
          user: {
            include: {
              profile: {
                include: {
                  present_Address: true,
                },
              },
            },
          },
        },
      },
      serviceOffers: true,
      serviceReviews: true,
      serviceSalt: true,
    },
  })
  const finalSlat: {
    time: string
    booking: boolean
  }[] = matchSlatTime(searchAppointment, result?.serviceSalt?.salt as string[])
  result?.serviceSalt?.salt = finalSlat

  return result
}

const deleteByIdFromDB = async (id: string): Promise<DoctorService | null> => {
  const doctorServices = await prisma.doctorService.findFirst({
    where: { id },
    include: {
      serviceOffers: true,
      serviceReviews: true,
      serviceSalt: true,
    },
  })
  if (!doctorServices) {
    throw new Send_API_Error(StatusCodes.OK, 'Doctor service Not found!')
  }
  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.serviceSalt.delete({
      where: {
        serviceId: doctorServices.id,
      },
    })
    const service = await transactionClient.doctorService.delete({
      where: {
        id,
      },
      include: {
        serviceOffers: true,
        serviceReviews: true,
        serviceSalt: true,
      },
    })

    return service
  })

  return result
}
const updateByIdIntoDB = async (
  id: string,
  data: Partial<ICreatedDoctorServiceData>,
): Promise<{ message: string }> => {
  const doctorServices = await prisma.doctorService.findFirst({
    where: { id },
    include: {
      serviceOffers: true,
      serviceReviews: true,
      serviceSalt: true,
    },
  })
  if (!doctorServices) {
    throw new Send_API_Error(StatusCodes.OK, 'Doctor service Not found!')
  }
  await prisma.$transaction(async transactionClient => {
    if (data.service) {
      await transactionClient.doctorService.update({
        where: {
          id,
        },
        data: data.service,
        include: {
          serviceOffers: true,
          serviceReviews: true,
          serviceSalt: true,
        },
      })
    }
    if (data.salt) {
      const DoctorSlat = generateSalt(
        data.salt.startTime,
        data.salt.endTime,
        Number(data.salt.duration),
      )

      await transactionClient.serviceSalt.update({
        where: {
          id: doctorServices?.serviceSalt?.id,
        },
        data: {
          duration: data.salt.duration,
          startTime: data.salt.startTime,
          endTime: data.salt.endTime,
          salt: DoctorSlat,
        },
      })
    }
  })

  return {
    message: 'Updated',
  }
}

const myBookingAppointment = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<Appointment[]>> => {
  const { page, skip, limit } = calculatePagination(options)
  const findDoctor = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
    include: {
      doctor: true,
    },
  })
  if (!findDoctor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'user not found')
  }
  const result = await prisma.appointment.findMany({
    take: limit,
    skip,
    where: {
      doctorId: findDoctor?.doctor?.id,
    },
    include: {
      user: true,
      service: true,
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
  const total = await prisma.appointment.count({
    where: { doctorId: findDoctor?.doctor?.id },
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

const myActiveGoogleMeetService = async (
  authUserId: string,
): Promise<GoogleMeet | null> => {
  const doctor = await prisma.doctor.findFirst({
    where: {
      user_id: authUserId,
    },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor Not found')
  }
  return await prisma.googleMeet.findFirst({
    where: {
      doctorId: doctor.id,
      status: meetingEnumStatus.Active,
    },
  })
}
const myCompletedGoogleMeetService = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<GoogleMeet[]>> => {
  const { skip, limit, page } = calculatePagination(options)
  const doctor = await prisma.doctor.findFirst({
    where: {
      user_id: authUserId,
    },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor Not found')
  }
  const result = await prisma.googleMeet.findMany({
    skip,
    take: limit,
    where: {
      doctorId: authUserId,
      status: meetingEnumStatus.Complete,
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
  const total = await prisma.googleMeet.count({
    where: {
      doctorId: authUserId,
      status: meetingEnumStatus.Complete,
    },
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

const myPaymentList = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<Payment[]>> => {
  const { skip, limit, page } = calculatePagination(options)
  const doctor = await prisma.user.findFirst({
    where: { id: authUserId },
    include: { doctor: true },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor not found')
  }
  const result = await prisma.payment.findMany({
    skip,
    take: limit,
    where: {
      doctorId: doctor.doctor?.id,
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
          appointments: {
            include: {
              user: true,
            },
          },
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
  const total = await prisma.payment.count({
    where: {
      doctorId: doctor.doctor?.id,
    },
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

const myWithdrawList = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<Withdraw[]>> => {
  const { skip, limit, page } = calculatePagination(options)
  const doctor = await prisma.user.findFirst({
    where: { id: authUserId },
    include: { doctor: true },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor not found')
  }
  const result = await prisma.withdraw.findMany({
    skip,
    take: limit,
    where: {
      doctorId: doctor?.doctor?.id,
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
  const total = await prisma.withdraw.count({
    where: {
      doctorId: doctor?.doctor?.id,
    },
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

const allDoctorFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({
    where: {
      role: UserRole.Doctor,
    },
    include: {
      doctor: {
        include: {
          doctorServices: true,
        },
      },
      profile: true,
    },
  })

  return result
}

const getFilterServiceFromDB = async (
  filters: { day?: string; category?: string; duration?: string },
  options: IPagination,
): Promise<IFilterResponse<DoctorService[]>> => {
  const { page, limit, skip } = calculatePagination(options)
  const { day, category, duration } = filters

  const whereConditions: Prisma.DoctorServiceWhereInput = {
    serviceDay: {
      has: day,
    },
    serviceSalt: {
      duration: duration,
    },
    category: category,
    // price: {
    //   gte: price,
    // },
    // profile: {
    //   user: {
    //     role: UserRole.Doctor,
    //     doctor: {
    //       experience: experience,
    //       specialist,
    //     },
    //   },
    //   present_Address: {
    //     district: district,
    //   },
    // },
  }

  // if (searchTerm) {
  //   andConditions.push({
  //     OR: doctorServiceSearchAbleFiled.map(filed => ({
  //       [filed]: {
  //         contains: searchTerm,
  //         mode: 'insensitive',
  //       },
  //     })),
  //   })
  // }
  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filterData).map(key => ({
  //       [key]: {
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         equals: (filterData as any)[key],
  //       },
  //     })),
  //   })
  // }

  const result = await prisma.doctorService.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      serviceOffers: true,
      serviceReviews: true,
      serviceSalt: true,
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
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.doctorService.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

export const Doctor = {
  allDoctorFromDB,
  createServiceIntoDB,
  myServiceFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getAllFromDB,
  myBookingAppointment,
  myActiveGoogleMeetService,
  myCompletedGoogleMeetService,
  myPaymentList,
  myWithdrawList,
  getFilterServiceFromDB,
}
