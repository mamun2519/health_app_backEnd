import { ServiceReview } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'

const insetIntoDB = async (
  authUserId: string,
  data: ServiceReview,
): Promise<ServiceReview> => {
  console.log(data)
  const user = await prisma.user.findFirst({
    where: { id: authUserId },
    include: { profile: true },
  })
  const service = await prisma.doctorService.findFirst({
    where: {
      id: data?.serviceId as string,
    },
    include: {
      doctor: true,
    },
  })

  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  if (!service) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Service Not Found')
  }
  const result = await prisma.$transaction(async transactionClient => {
    data.userId = authUserId
    const review = await transactionClient.serviceReview.create({
      data,
    })

    const message = `${user?.profile?.user_name} review your Service`
    await transactionClient.notification.create({
      data: {
        userId: service?.doctor?.user_id,
        message,
      },
    })
    return review
  })

  return result
}

const myReview = async (authUserId: string): Promise<ServiceReview[]> => {
  return await prisma.serviceReview.findMany({
    where: {
      userId: authUserId,
    },
  })
}

const getByIdFromDB = async (id: string): Promise<ServiceReview | null> => {
  return await prisma.serviceReview.findFirst({ where: { id } })
}
const updateByIdIntoDB = async (
  id: string,
  data: Partial<ServiceReview>,
): Promise<ServiceReview | null> => {
  return await prisma.serviceReview.update({ where: { id }, data })
}

const deleteByIdFromDB = async (id: string): Promise<ServiceReview | null> => {
  return await prisma.serviceReview.delete({ where: { id } })
}

const getServiceWithReview = async (id: string): Promise<ServiceReview[]> => {
  console.log('id-', id)
  const result = await prisma.serviceReview.findMany({
    where: { serviceId: id },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  })
  return result
}

const getAllReviewFromDb = async (): Promise<ServiceReview[]> => {
  const result = await prisma.serviceReview.findMany({
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  })
  return result
}

export const ServiceReviewServices = {
  getServiceWithReview,
  insetIntoDB,
  myReview,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getAllReviewFromDb,
}
