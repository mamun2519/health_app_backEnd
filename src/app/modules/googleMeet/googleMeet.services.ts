import { GoogleMeet, meetingEnumStatus } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { IFilterResponse } from '../../../interface/userFilteResponse'
import { calculatePagination } from '../../../helper/paginationHalper'
import { IPagination } from '../../../interface/pagination'

const insetIntoDB = async (
  authUserId: string,
  data: GoogleMeet,
): Promise<GoogleMeet> => {
  const doctor = await prisma.doctor.findFirst({
    where: { user_id: authUserId },
    include: { user: true },
  })

  if (!doctor) {
    throw new Send_API_Error(StatusCodes.BAD_REQUEST, 'doctor not found')
  }
  const isActiveMeet = await prisma.googleMeet.findFirst({
    where: {
      status: meetingEnumStatus.Active,
      serviceId: data.serviceId,
    },
  })
  if (isActiveMeet) {
    throw new Send_API_Error(
      StatusCodes.BAD_REQUEST,
      'Yor Meet link already active.',
    )
  }
  data.doctorId = doctor.id
  const result = await prisma.googleMeet.create({
    data,
    include: {
      service: true,
    },
  })
  return result
}

const getByIdFromDB = async (id: string): Promise<GoogleMeet | null> => {
  return await prisma.googleMeet.findFirst({
    where: { id },
    include: {
      service: true,
      meetingRequests: {
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
}
const deleteByIdFromDB = async (id: string): Promise<GoogleMeet | null> => {
  return await prisma.googleMeet.delete({ where: { id } })
}
const updateByIdIntoDB = async (
  id: string,
  data: Partial<GoogleMeet>,
): Promise<GoogleMeet | null> => {
  return await prisma.googleMeet.update({ where: { id }, data })
}

const updateStatusAndDeleteGoogleMeet = async (
  id: string,
): Promise<GoogleMeet | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const updateGoogleMeet = await transactionClient.googleMeet.update({
      where: { id },
      data: {
        status: meetingEnumStatus.Complete,
      },
    })
    if (updateGoogleMeet) {
      await transactionClient.googleMeet.delete({ where: { id } })
    }

    return updateGoogleMeet
  })
  return result
}

const getAllActiveMeetFromDB = async (
  options: IPagination,
): Promise<IFilterResponse<GoogleMeet[]>> => {
  const { page, skip, limit } = calculatePagination(options)
  const result = await prisma.googleMeet.findMany({
    skip,
    take: limit,
    where: {
      status: meetingEnumStatus.Active,
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
    where: { status: meetingEnumStatus.Active },
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

export const GoogleMeetService = {
  insetIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  updateStatusAndDeleteGoogleMeet,
  getAllActiveMeetFromDB,
}
