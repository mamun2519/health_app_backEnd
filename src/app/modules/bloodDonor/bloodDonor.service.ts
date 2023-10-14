import {
  DonorRequest,
  DonorRequestStatus,
  PresentAddress,
  Prisma,
  User,
  UserRole,
} from '@prisma/client'
import prisma from '../../../prisma/prisma'
import { bloodDonorSearchAbleFiled } from './bloodDonor.constant'
import {
  IFiltersUserDonorRequest,
  IStatusRequest,
} from './bloodDonor.interface'
import { IPagination } from '../../../interface/pagination'
import { calculatePagination } from '../../../helper/paginationHalper'
import { IFilterResponse } from '../../../interface/userFilteResponse'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { IAuthUser } from '../../../interface/common'

const filtersBloodDonorFromDB = async (
  filters: IFiltersUserDonorRequest,
  pagination: IPagination,
): Promise<IFilterResponse<PresentAddress[]>> => {
  const { district, blood_group, searchTerm, sub_district } = filters

  console.log(filters)
  const { skip, limit, page } = calculatePagination(pagination)

  const whereConditions: Prisma.PresentAddressWhereInput = {
    district: district, // Add district filter
    // police_station: police_station,
    sub_district: sub_district,
    profile: {
      blood_group: blood_group, // Add blood_group filter
      user: {
        role: UserRole.BloodDonor,
      },
    },
  }

  if (searchTerm) {
    whereConditions.OR = bloodDonorSearchAbleFiled.map(searchFiled => ({
      [searchFiled]: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }))
  }

  const donors = await prisma.presentAddress.findMany({
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
      profile: {
        include: {
          user: {
            include: {
              bloodDonor: true,
            },
          },
        },
      },
    },
  })
  const total = await prisma.presentAddress.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: donors,
  }
}

const getAllFromDB = async (): Promise<User[]> => {
  const donors = await prisma.user.findMany({
    where: {
      role: UserRole.BloodDonor,
    },
    include: {
      profile: {
        include: {
          education: true,
          permanent_Address: true,
          present_Address: true,
        },
      },
      bloodDonor: true,
    },
  })

  return donors
}

const getByIdFromDB = async (id: string) => {
  const donors = await prisma.user.findFirst({
    where: {
      role: UserRole.BloodDonor,
      id: id,
    },
    include: {
      profile: {
        include: {
          education: true,
          permanent_Address: true,
          present_Address: true,
        },
      },
      bloodDonor: {
        include: {
          donorReviews: true,
          donorRequests: true,
        },
      },
    },
  })
  return donors
}

const userDonorRequest = async (
  authUserId: string,
  pagination: IPagination,
): Promise<IFilterResponse<DonorRequest[]>> => {
  const donor = await prisma.user.findUnique({
    where: {
      id: authUserId,
    },
    include: {
      bloodDonor: true,
    },
  })
  if (!donor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Blood donor not found!')
  }
  const { page, skip, limit } = calculatePagination(pagination)
  const result = await prisma.donorRequest.findMany({
    skip,
    take: limit,
    where: {
      donor: {
        id: donor.bloodDonor?.id,
      },
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  })
  const total = await prisma.donorRequest.count({
    where: {
      donorId: donor.bloodDonor?.id,
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
const AllDonorRequest = async (
  pagination: IPagination,
): Promise<IFilterResponse<DonorRequest[]>> => {
  const { page, skip, limit } = calculatePagination(pagination)
  const result = await prisma.donorRequest.findMany({
    skip,
    take: limit,

    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  })
  const total = await prisma.donorRequest.count({})
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}
const getByIdDonorRequestFromDB = async (
  id: string,
): Promise<DonorRequest | null> => {
  return await prisma.donorRequest.findUnique({
    where: { id },
    include: {
      donor: {
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
      user: {
        include: {
          profile: true,
        },
      },
    },
  })
}
const updateDonorRequestStatusByIdFromDB = async (
  authUser: IAuthUser,
  payload: IStatusRequest,
): Promise<{ message: string }> => {
  const donorRequestData = await prisma.donorRequest.findUnique({
    where: {
      id: payload.id,
    },
  })
  if (!donorRequestData) {
    throw new Send_API_Error(
      StatusCodes.NOT_FOUND,
      'Donor Request Data not found!',
    )
  }

  // check status condition
  if (
    payload.status == donorRequestData.status &&
    payload.status !== DonorRequestStatus.Accepted
  ) {
    if (donorRequestData.status == DonorRequestStatus.Cancel) {
      throw new Send_API_Error(StatusCodes.NOT_FOUND, 'already cancel request')
    } else if (donorRequestData.status == DonorRequestStatus.Completed) {
      throw new Send_API_Error(
        StatusCodes.NOT_FOUND,
        'Already complete request',
      )
    } else {
      throw new Send_API_Error(
        StatusCodes.NOT_FOUND,
        'Only you can update accepted donor request status',
      )
    }
  } else if (
    payload.status == donorRequestData.status &&
    payload.status !== DonorRequestStatus.Completed
  ) {
    throw new Send_API_Error(
      StatusCodes.NOT_FOUND,
      'Only you can update complete donor request status',
    )
  } else if (
    payload.status == donorRequestData.status &&
    payload.status !== DonorRequestStatus.Cancel
  ) {
    throw new Send_API_Error(
      StatusCodes.NOT_FOUND,
      'Only you can update Cancel donor request status',
    )
  }
  // if updated status accepted then condition accepted
  if (payload.status == DonorRequestStatus.Accepted) {
    await prisma.$transaction(async transactionClient => {
      const updatedStatus = await transactionClient.donorRequest.update({
        where: {
          id: payload.id,
        },
        data: {
          status: payload.status,
        },
        include: {
          user: true,
          donor: true,
        },
      })
      const message = `blood donor accepted your donor request.please meet the donner and colleted blood.`
      await transactionClient.notification.create({
        data: {
          userId: updatedStatus.user.id,
          message,
        },
      })
      // update donor total pending request
      await transactionClient.bloodDonor.update({
        where: {
          id: updatedStatus.donorId,
        },
        data: {
          totalPendingRequest: {
            decrement: 1,
          },
        },
      })
    })
  }
  // if updated status complete then condition accepted
  else if (payload.status == DonorRequestStatus.Completed) {
    await prisma.$transaction(async transactionClient => {
      const updatedStatus = await transactionClient.donorRequest.update({
        where: {
          id: payload.id,
        },
        data: {
          status: payload.status,
        },
        include: {
          user: true,
          donor: true,
        },
      })
      const message = `donor share complete Successfully`
      await transactionClient.notification.create({
        data: {
          userId: updatedStatus.donor.user_id,
          message,
        },
      })
      await transactionClient.bloodDonor.update({
        where: {
          id: updatedStatus.donorId,
        },
        data: {
          total_donnet: {
            increment: 1,
          },
          reward: {
            increment: 5,
          },
        },
      })
    })
  }
  // if updated status cancel then condition accepted
  if (payload.status == DonorRequestStatus.Cancel) {
    await prisma.$transaction(async transactionClient => {
      const updatedStatus = await transactionClient.donorRequest.update({
        where: {
          id: payload.id,
        },
        data: {
          status: payload.status,
        },
        include: {
          user: true,
          donor: true,
        },
      })
      const message =
        authUser.role === UserRole.User
          ? `user cancel her donor request`
          : `donor cancel your donor request.`
      await transactionClient.notification.create({
        data: {
          userId:
            authUser.role === UserRole.User
              ? updatedStatus.donor.user_id
              : updatedStatus.user.id,
          message,
        },
      })

      await transactionClient.bloodDonor.update({
        where: {
          id: updatedStatus.donorId,
        },
        data: {
          totalPendingRequest: {
            decrement: 1,
          },
        },
      })
    })
  }

  return {
    message: 'Status Update Successfully',
  }
}
const donorRequestUpdateByIdIntoDB = async (
  id: string,
  payload: Partial<DonorRequest>,
): Promise<DonorRequest> => {
  return await prisma.donorRequest.update({
    where: {
      id,
    },
    data: payload,
  })
}
const deleteDonorRequestByIdFromDB = async (
  id: string,
): Promise<DonorRequest | null> => {
  return await prisma.donorRequest.delete({ where: { id } })
}

export const BloodDonorService = {
  filtersBloodDonorFromDB,
  getAllFromDB,
  getByIdFromDB,
  userDonorRequest,
  getByIdDonorRequestFromDB,
  updateDonorRequestStatusByIdFromDB,
  donorRequestUpdateByIdIntoDB,
  deleteDonorRequestByIdFromDB,
  AllDonorRequest,
}
