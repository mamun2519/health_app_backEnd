import { Prisma, ServiceOffer } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import { IServiceOfferFilter } from './serviceOffer.interface'
import { IPagination } from '../../../interface/pagination'
import { calculatePagination } from '../../../helper/paginationHalper'
import { ServiceOfferSearchAbleFiled } from '../prescription/prescription.constant'
import { IFilterResponse } from '../../../interface/userFilteResponse'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'

const insetIntoDB = async (
  data: ServiceOffer,
  authUserId: string,
): Promise<ServiceOffer> => {
  const user = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
    include: {
      doctor: true,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor Not found')
  }
  data.doctorId = user.doctor?.id as string
  return await prisma.serviceOffer.create({ data })
}

const getAllFromDB = async (
  filets: IServiceOfferFilter,
  options: IPagination,
): Promise<IFilterResponse<ServiceOffer[] | null>> => {
  const { page, limit, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filets
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      OR: ServiceOfferSearchAbleFiled.map(filed => ({
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

  const whereConditions: Prisma.ServiceOfferWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.serviceOffer.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      service: true,
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
  const total = await prisma.serviceOffer.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}
const deleteByIdFromDB = async (id: string): Promise<ServiceOffer | null> => {
  return await prisma.serviceOffer.delete({
    where: { id },
  })
}

const updateByIdIntoDB = async (
  id: string,
  data: Partial<ServiceOffer>,
): Promise<ServiceOffer | null> => {
  return await prisma.serviceOffer.update({
    where: { id },
    data,
  })
}
const getByIdFromDB = async (id: string): Promise<ServiceOffer | null> => {
  return await prisma.serviceOffer.findFirst({
    where: { id },
  })
}
const doctorOfferService = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<ServiceOffer[]>> => {
  const { page, limit, skip } = calculatePagination(options)

  const user = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
    include: {
      doctor: true,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor Not found')
  }

  const result = await prisma.serviceOffer.findMany({
    skip,
    take: limit,
    where: {
      doctorId: user?.doctor?.id,
    },
    include: {
      service: true,
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

  const total = await prisma.serviceOffer.count({
    where: {
      doctorId: user?.doctor?.id,
    },
  })

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  }
}

export const ServiceOfferService = {
  insetIntoDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getByIdFromDB,
  getAllFromDB,
  doctorOfferService,
}
