import { Appointment, CompanyBalance, Payment, Prisma } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { IPaymentFilter } from './payment.interface'
import { IPagination } from '../../../interface/pagination'
import { calculatePagination } from '../../../helper/paginationHalper'
import { PaymentSearchAbleFiled } from './payment.constant'
import { IFilterResponse } from '../../../interface/userFilteResponse'
import { AppointmentService } from '../appointment/appointment.services'
import Stripe from 'stripe'

const stripe = new Stripe(
  'sk_test_51L1nmNCGpaTt0RU81oq26j6Ta7gwb9pGlOOwxjeXAQgefsXMvmRxFUopKE2St6GDbDpxjUug0KxRyqzL6oKarPcR00lqLjh70r',
)

const createPayment = async (
  authUserId: string,
  data: Payment,
): Promise<Payment> => {
  console.log(data)
  const user = await prisma.user.findFirst({ where: { id: authUserId } })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }

  // const service = await prisma.doctorService.findFirst({
  //   where: {
  //     id: data.serviceId,
  //   },
  // })
  const doctor = await prisma.doctor.findFirst({
    where: { id: data.doctorId },
  })

  const newBalance = Number(doctor?.balance) + Number(data.price)
  console.log(data)
  data.userId = authUserId
  data.price = Number(data.price)
  const result = await prisma.$transaction(async transactionClient => {
    const payment = transactionClient.payment.create({ data })

    await transactionClient.doctor.update({
      where: {
        id: data.doctorId,
      },
      data: {
        balance: newBalance,
      },
    })

    return payment
  })

  return result
}

const getAllFromDB = async (
  filters: IPaymentFilter,
  options: IPagination,
): Promise<IFilterResponse<Payment[]>> => {
  const { page, limit, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      OR: PaymentSearchAbleFiled.map(filed => ({
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

  const whereConditions: Prisma.PaymentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.payment.findMany({
    skip,
    take: limit,
    where: whereConditions,
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
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.payment.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}
const getByIdFromDB = async (id: string): Promise<Payment | null> => {
  return await prisma.payment.findFirst({
    where: { id },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      service: {
        include: {
          doctor: {
            include: {
              user: {
                include: {
                  profile: true,
                },
              },
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
}
const updateByIdIntoDB = async (
  id: string,
  data: Partial<Payment>,
): Promise<Payment | null> => {
  return await prisma.payment.update({
    where: { id },
    data,
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
}
const deleteByIdFromDB = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.delete({
    where: { id },
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
  console.log(result)

  return result
}

const createCompanyBalance = async (
  data: CompanyBalance,
): Promise<CompanyBalance> => {
  return await prisma.companyBalance.create({ data })
}

const OrderAppointment = async (
  appointment: Appointment[],
  payment: Payment[],
  authUserId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const user = await prisma.user.findFirst({ where: { id: authUserId } })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }

  for (let i = 0; i < appointment?.length; i++) {
    appointment.map(async singleAppointment => {
      await AppointmentService.insetIntoDB(singleAppointment, authUserId)
    })
  }
  for (let i = 0; i < payment.length; i++) {
    payment.map(async payment => {
      await createPayment(authUserId, payment)
    })
    await prisma.cart.deleteMany({
      where: {
        userId: authUserId,
      },
    })

    return {
      message: 'Success',
    }
  }
}

const paymentByStripe = async () => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 140,
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return {
    clientSecret: paymentIntent.client_secret,
  }
}

export const PaymentService = {
  OrderAppointment,
  createPayment,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  createCompanyBalance,
  paymentByStripe,
}
