import { Prisma, Withdraw, WithdrawEnumStatus } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { IWithdrawFilter } from './withdraw.interface'
import { IPagination } from '../../../interface/pagination'
import { IFilterResponse } from '../../../interface/userFilteResponse'
import { calculatePagination } from '../../../helper/paginationHalper'
import { WithdrawSearchAbleFiled } from './withdrow.constant'

const doctorWithDrawRequest = async (
  authUserId: string,
  data: Withdraw,
): Promise<Withdraw> => {
  const doctor = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
    include: {
      doctor: true,
    },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor Not Found')
  }

  const doctorFinalWithdrawBalance = Number(data.amount) * 0.8
  const companyFinalEarnBalance =
    Number(data.amount) - doctorFinalWithdrawBalance
  const result = await prisma.$transaction(async transactionClient => {
    data.finalAmonut = doctorFinalWithdrawBalance
    data.companyEarn = companyFinalEarnBalance
    data.doctorId = doctor.doctor?.id as string
    const completeWithdraw = await transactionClient.withdraw.create({
      data,
    })

    return completeWithdraw
  })

  return result
}

const getAllFromDB = async (
  filters: IWithdrawFilter,
  options: IPagination,
): Promise<IFilterResponse<Withdraw[]>> => {
  const { page, limit, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      OR: WithdrawSearchAbleFiled.map(filed => ({
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

  const whereConditions: Prisma.WithdrawWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.withdraw.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      user: {
        include: {
          profile: true,
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
    },
    orderBy: options.sortBy
      ? {
          [options.sortBy]: 'asc',
        }
      : {
          createdAt: 'desc',
        },
  })
  const total = await prisma.withdraw.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}
const getByIdFromDB = async (id: string): Promise<Withdraw | null> => {
  return await prisma.withdraw.findFirst({
    where: { id },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      doctor: true,
    },
  })
}
const updateByIdIntoDB = async (
  id: string,
  data: Partial<Withdraw>,
): Promise<Withdraw | null> => {
  return await prisma.withdraw.update({
    where: { id },
    data,
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      doctor: true,
    },
  })
}
const deleteByIdFromDB = async (id: string): Promise<Withdraw | null> => {
  console.log(id)
  return await prisma.withdraw.delete({
    where: { id },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      doctor: true,
    },
  })
}

const withdrawAccepted = async (
  authUserId: string,
  data: {
    id: string
    status: WithdrawEnumStatus
  },
): Promise<Withdraw> => {
  console.log('data', data)
  const user = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
    include: {
      doctor: true,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'user Not Found')
  }

  const doctor = await prisma.withdraw.findFirst({
    where: {
      id: data.id,
    },
    include: {
      doctor: {
        include: {
          user: true,
        },
      },
    },
  })
  const companyBalance = await prisma.companyBalance.findMany({})
  if (data.status === 'Complete') {
    const result = await prisma.$transaction(async transactionClient => {
      const completeWithdraw = await transactionClient.withdraw.update({
        where: { id: data.id },
        data: {
          status: WithdrawEnumStatus.Complete,
          withdrawAccptetManagerId: user?.id,
        },
      })

      const doctorTotalBalance =
        Number(doctor?.doctor?.balance) - Number(doctor?.amount)
      await transactionClient.doctor.update({
        where: {
          id: doctor?.doctor?.id,
        },
        data: {
          balance: doctorTotalBalance,
        },
      })

      const companyFinalBalance =
        companyBalance[0]?.balance + Number(doctor?.companyEarn)

      await transactionClient.companyBalance.update({
        where: {
          id: companyBalance[0]?.id,
        },
        data: {
          balance: companyFinalBalance,
        },
      })

      const message = `Accepted your withdraw request. withdraw balance ${doctor?.amount} BDT. 20% company Earn ${doctor?.companyEarn}, final withdraw ${doctor?.finalAmonut}`
      await transactionClient.notification.create({
        data: {
          userId: doctor?.doctor.user_id as string,
          message,
        },
      })

      return completeWithdraw
    })

    return result
  } else {
    const completeWithdraw = await prisma.withdraw.update({
      where: { id: data.id },
      data: {
        status: WithdrawEnumStatus.Cancel,
        withdrawAccptetManagerId: user?.id,
      },
    })
    const message = `Your Withdraw Request Cancel`
    await prisma.notification.create({
      data: {
        userId: doctor?.doctor.user_id as string,
        message,
      },
    })

    return completeWithdraw
  }
}

export const WithdrawServices = {
  doctorWithDrawRequest,
  getAllFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getByIdFromDB,
  withdrawAccepted,
}
