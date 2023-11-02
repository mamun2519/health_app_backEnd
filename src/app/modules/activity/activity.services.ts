import { StatusCodes } from 'http-status-codes'
import Send_API_Error from '../../../error/apiError'
import prisma from '../../../prisma/prisma'
import {
  IAdminActivity,
  IDoctorActivity,
  IDonorActivity,
  IUserActivity,
} from './activity.interface'

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
    date: lastBookingSchedule[0]?.bookingDate ?? 'no date',
    schedule: lastBookingSchedule[0]?.slatTime ?? 'no schedule',
  }

  return {
    bookingAppointment: appointment,
    donorRequest,
    completeDonation,
    schedule,
  }
}

const donorActivity = async (id: string): Promise<IDonorActivity> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      bloodDonor: true,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }

  console.log(user)

  const appointment = await prisma.appointment.count({
    where: {
      userId: user.id,
    },
  })
  const donorRequest = await prisma.donorRequest.count({
    where: {
      donorId: user?.bloodDonor?.id,
    },
  })
  const pendingRequest = await prisma.donorRequest.count({
    where: {
      donorId: user?.bloodDonor?.id,
      status: 'Pending',
    },
  })
  const completeDonation = await prisma.donorRequest.count({
    where: {
      donorId: user?.bloodDonor?.id,
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
    date: lastBookingSchedule[0]?.bookingDate ?? 'no date',
    schedule: lastBookingSchedule[0]?.slatTime ?? 'no schedule',
  }

  return {
    bookingAppointment: appointment,
    donorRequest,
    completeDonation,
    schedule,
    pendingRequest,
  }
}

const doctorActivity = async (id: string): Promise<IDoctorActivity> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      // bloodDonor: true,
      doctor: true,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }

  const appointment = await prisma.appointment.count({
    where: {
      doctorId: user?.doctor?.id,
    },
  })
  const service = await prisma.doctorService.count({
    where: {
      doctorId: user?.doctor?.id,
    },
  })
  const donorRequest = await prisma.donorRequest.count({
    where: {
      userId: user?.id,
    },
  })

  const completeDonation = await prisma.donorRequest.count({
    where: {
      userId: user?.id,
      status: 'Completed',
    },
  })

  const pendingWithdraw = await prisma.withdraw.count({
    where: {
      doctorId: user?.doctor?.id,
      status: 'Pending',
    },
  })

  return {
    appointment: appointment,
    service,
    balance: Number(user?.doctor?.balance),
    patient: Number(user?.doctor?.total_patient),
    completeDonation,
    donorRequest,
    pendingWithdraw,
  }
}

const adminActivity = async (id: string): Promise<IAdminActivity> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      // bloodDonor: true,
      doctor: true,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }

  const balance = await prisma.companyBalance.findMany({})

  const appointment = await prisma.appointment.count({})
  const service = await prisma.doctorService.count({})

  const completeDonation = await prisma.donorRequest.count({
    where: {
      status: 'Completed',
    },
  })

  const pendingWithdraw = await prisma.withdraw.count({
    where: {
      status: 'Pending',
    },
  })
  const doctor = await prisma.user.count({
    where: {
      role: 'Doctor',
    },
  })
  const bloodDonor = await prisma.user.count({
    where: {
      role: 'BloodDonor',
    },
  })

  return {
    appointment: appointment,
    service,
    balance: Number(balance[0].balance),
    patient: Number(user?.doctor?.total_patient),
    completeDonation,
    pendingWithdraw,
    doctor,
    bloodDonor,
  }
}

export const ActivityService = {
  userActivity,
  donorActivity,
  doctorActivity,
  adminActivity,
}
