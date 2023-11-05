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

  return {
    bookingAppointment: appointment,
    donorRequest,
    completeDonation,
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

  return {
    bookingAppointment: appointment,
    donorRequest,
    completeDonation,
    schedule,
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

  return {
    appointment: appointment,
    service,
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
  const sales = await prisma.payment.findMany({
    include: {
      service: {
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
      },
    },
  })
  const totalSales = sales.reduce((acc, obj) => acc + obj.price, 0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniqueObjects: any = {}

  // Iterate through the array and add up prices for duplicates
  sales.forEach(obj => {
    const key = obj.serviceId
    if (uniqueObjects[key]) {
      uniqueObjects[key].price += obj.price
    } else {
      uniqueObjects[key] = { ...obj }
    }
  })

  // Convert the uniqueObjects object back into an array
  const uniqueArrayOfObjects = Object.values(uniqueObjects)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uniqueArrayOfObjects.sort((a: any, b: any) => b.price - a.price)

  // Get the top 5 unique objects with the highest prices
  const top5Prices = uniqueArrayOfObjects.slice(0, 5)
  console.log(top5Prices)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalTop5Service = top5Prices.map((service: any) => {
    return {
      doctorName: `${service.service.doctor.user.profile.first_name} ${service.service.doctor.user.profile.last_name}`,
      serviceName: service.service.title,
      price: service.price,
    }
  })
  console.log(finalTop5Service)

  return {
    appointment: appointment,
    topService: finalTop5Service,
    service,
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
