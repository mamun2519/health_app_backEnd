/* eslint-disable @typescript-eslint/no-explicit-any */
import { Appointment, Prisma } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { IAppointmentFilter } from './appointment.interface'
import { IPagination } from '../../../interface/pagination'
import { calculatePagination } from '../../../helper/paginationHalper'
import { AppointmentSearchAbleFiled } from './appointment.constant'
import { IFilterResponse } from '../../../interface/userFilteResponse'

const insetIntoDB = async (
  data: Appointment,
  authUserId: string,
): Promise<Appointment> => {
  const user = await prisma.user.findFirst({
    where: { id: authUserId },
    include: { profile: true },
  })

  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not found')
  }
  const doctor = await prisma.doctor.findFirst({
    where: {
      id: data.doctorId,
    },
    include: {
      user: true,
    },
  })

  const doctorSerialCheck = await prisma.appointment.findMany({
    where: {
      serviceId: data.serviceId,
      bookingDate: data.bookingDate,
    },
  })

  data.serialNo = doctorSerialCheck.length + 1
  const result = await prisma.$transaction(async transactionClient => {
    data.userId = authUserId
    const userAppointment = await transactionClient.appointment.create({
      data,
      include: { service: true },
    })

    const message = `${user.profile?.first_name} a appointment in your service. Appointment date ${data.bookingDate}`

    await transactionClient.doctor.update({
      where: {
        id: data.doctorId,
      },
      data: {
        total_patient: {
          increment: 1,
        },
      },
    })

    await transactionClient.notification.create({
      data: {
        userId: doctor?.user_id as string,
        message,
      },
    })

    return userAppointment
  })

  return result
}

const getAllFromDB = async (
  filter: IAppointmentFilter,
  options: IPagination,
): Promise<IFilterResponse<Appointment[]>> => {
  const { searchTerm, ...filterData } = filter
  const { page, limit, skip } = calculatePagination(options)
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      OR: AppointmentSearchAbleFiled.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereCondition: Prisma.AppointmentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {}
  const result = await prisma.appointment.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      service: true,
      user: {
        include: {
          profile: true,
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
  const total = await prisma.appointment.count({ where: whereCondition })

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  }
}

const getByIdFromDB = async (id: string): Promise<Appointment | null> => {
  return await prisma.appointment.findFirst({
    where: { id },
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
      user: {
        include: {
          profile: true,
        },
      },
    },
  })
}
const updateByIdIntoDB = async (
  id: string,
  data: Partial<Appointment>,
): Promise<Appointment | null> => {
  console.log(data)
  if (data.status == 'Reject' || data.status === 'Cancel') {
    const result = await prisma.appointment.update({
      where: { id },
      data: {
        status: data.status,
        slatTime: 'Cancel',
      },
    })
    return result
  } else {
    return await prisma.appointment.update({ where: { id }, data })
  }
}

const deleteByIdFromDB = async (id: string): Promise<Appointment | null> => {
  return await prisma.appointment.delete({ where: { id } })
}

export const AppointmentService = {
  insetIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
}
