import { StatusCodes } from 'http-status-codes'
import Send_API_Error from '../../../error/apiError'
import prisma from '../../../prisma/prisma'
import { IUserActivity } from './activity.interface'

const userActivity = async (id: string): Promise<IUserActivity> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }

  const appointment = await prisma.appointment.count({
    where: {
      userId: user.id,
    },
  })
  const donorRequest = await prisma.donorRequest.count({
    where: {
      userId: user.id,
    },
  })
  const completeDonation = await prisma.donorRequest.count({
    where: {
      userId: user.id,
      status: 'Completed',
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastBookingSchedule = await prisma.appointment.findMany({
    take: 1,
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const schedule = {
    date: lastBookingSchedule[0].bookingDate as string,
    schedule: lastBookingSchedule[0].slatTime,
  }

  return {
    bookingAppointment: appointment,
    donorRequest,
    completeDonation,
    schedule,
  }
}

export const ActivityService = {
  userActivity,
}
