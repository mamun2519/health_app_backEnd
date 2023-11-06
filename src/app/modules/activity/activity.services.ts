import { StatusCodes } from 'http-status-codes'
import Send_API_Error from '../../../error/apiError'
import prisma from '../../../prisma/prisma'
import {
  IAdminActivity,
  IDoctorActivity,
  IDonorActivity,
  IUserActivity,
} from './activity.interface'
import {
  DoctorResentWithdraw,
  DoctorTop5ServicePrice,
  FinalTop5Donar,
  FinalTop5Service,
  MyCompleteBloodDonation,
  MyDonarRequest,
} from './activity.utils'

const userActivity = async (id: string): Promise<IUserActivity> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      profile: true,
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

  const myDonarRequest = await MyDonarRequest(user.id as string)
  console.log(myDonarRequest)
  return {
    bookingAppointment: appointment,
    donorRequest,
    completeDonation,
    myDonarRequest,
    schedule,
    name: `${user.profile?.first_name}  ${user.profile?.last_name} `,
  }
}

const donorActivity = async (id: string): Promise<IDonorActivity> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      bloodDonor: true,
      profile: true,
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

  const myCompleteDonation = await MyCompleteBloodDonation(
    user?.bloodDonor?.id as string,
  )
  console.log(myCompleteDonation)

  return {
    bookingAppointment: appointment,
    donorRequest,
    completeDonation,
    schedule,
    myCompleteDonation,
    pendingRequest,
    name: `${user.profile?.first_name}  ${user.profile?.last_name} `,
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
      profile: true,
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

  const { finalTopPriceService, totalSales } = await DoctorTop5ServicePrice(
    user?.doctor?.id as string,
  )

  const resentWithdraw = await DoctorResentWithdraw(user?.doctor?.id as string)
  return {
    appointment: appointment,
    service,
    resentWithdraw,
    top5MyServicePrice: finalTopPriceService,
    myTotalSales: totalSales,
    balance: Number(user?.doctor?.balance),
    patient: Number(user?.doctor?.total_patient),
    completeDonation,
    donorRequest,
    pendingWithdraw,
    name: `${user.profile?.first_name}  ${user.profile?.last_name} `,
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
      profile: true,
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

  const { totalSales, finalTop5Service } = await FinalTop5Service()

  const finalTop5Donor = await FinalTop5Donar()
  const withdraw = await prisma.withdraw.findMany({
    take: 5,
    where: {
      status: 'Complete',
    },
    include: {
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
    orderBy: {
      amount: 'desc',
    },
  })
  const Top5Withdraw = withdraw.map(withdraw => {
    return {
      name: `${withdraw.doctor.user.profile?.first_name} ${withdraw.doctor.user.profile?.last_name}`,
      amount: withdraw.amount,
    }
  })

  return {
    appointment: appointment,
    topService: finalTop5Service,
    topDonor: finalTop5Donor,
    service,
    lastWithdraw: Top5Withdraw,
    balance: Number(balance[0].balance),
    sales: totalSales,
    completeDonation,
    pendingWithdraw,
    doctor,
    bloodDonor,
    name: `${user.profile?.first_name}  ${user.profile?.last_name} `,
  }
}

export const ActivityService = {
  userActivity,
  donorActivity,
  doctorActivity,
  adminActivity,
}
