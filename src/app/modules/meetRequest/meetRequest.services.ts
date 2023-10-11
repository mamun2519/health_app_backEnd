import { MeetingRequest } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { IFilterResponse } from '../../../interface/userFilteResponse'
import { IPagination } from '../../../interface/pagination'
import { calculatePagination } from '../../../helper/paginationHalper'

const createMeetingRequestIntoDB = async (
  authUserId: string,
  payload: MeetingRequest,
) => {
  const user = await prisma.user.findFirst({ where: { id: authUserId } })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not found')
  }

  payload.userId = authUserId
  const appointment = await prisma.appointment.findFirst({
    where: { id: payload.appointmentId, userId: authUserId },
  })

  if (appointment?.serialNo == payload.serialNo) {
    payload.verifay = true
  } else {
    payload.verifay = false
  }

  const result = await prisma.meetingRequest.create({
    data: payload,
    include: {
      googleMeet: {
        include: {
          service: true,
        },
      },
    },
  })
  return result
}

const updateByIdIntoDB = async (
  id: string,
  payload: Partial<MeetingRequest>,
): Promise<MeetingRequest> => {
  return await prisma.meetingRequest.update({
    where: { id },
    data: payload,
  })
}
const getByIdFromDB = async (id: string): Promise<MeetingRequest | null> => {
  return await prisma.meetingRequest.findUnique({
    where: { id },
  })
}

const deleteByIdFromDB = async (id: string): Promise<MeetingRequest | null> => {
  return await prisma.meetingRequest.delete({ where: { id } })
}

const doctorMeetingRequest = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<MeetingRequest[]>> => {
  const user = await prisma.user.findFirst({
    where: { id: authUserId },
    include: {
      doctor: true,
    },
  })
  const { limit, skip, page } = calculatePagination(options)
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor Not Found')
  }

  const result = await prisma.meetingRequest.findMany({
    skip,
    take: limit,
    where: {
      doctorId: user?.doctor?.id,
    },
    include: {
      user: {
        include: { profile: true },
      },
      appointment: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  })
  const total = await prisma.meetingRequest.count({
    where: {
      doctorId: user?.doctor?.id,
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

export const MeetingRequestService = {
  createMeetingRequestIntoDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  getByIdFromDB,
  doctorMeetingRequest,
}
