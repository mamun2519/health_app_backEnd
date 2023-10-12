import { DonorReview } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'

const createDonorReviewIntoDB = async (
  authUserId: string,
  payload: DonorReview,
) => {
  payload.userId = authUserId
  const user = await prisma.profile.findFirst({
    where: {
      user_id: authUserId,
    },
  })
  console.log(payload)
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User not found')
  }
  const result = await prisma.$transaction(async transactionClient => {
    const donorReview = await transactionClient.donorReview.create({
      data: payload,
    })
    const message = `${user.user_name} review your profile`
    await transactionClient.notification.create({
      data: {
        userId: payload.userId,
        message,
      },
    })
    return donorReview
  })
  return result
}

const updateByIdIntoDB = async (
  id: string,
  payload: Partial<DonorReview>,
): Promise<DonorReview> => {
  return await prisma.donorReview.update({
    where: { id },
    data: payload,
  })
}
const getByIdFromDB = async (id: string): Promise<DonorReview | null> => {
  return await prisma.donorReview.findUnique({
    where: { id },
  })
}

const deleteByIdFromDB = async (id: string): Promise<DonorReview | null> => {
  return await prisma.donorReview.delete({ where: { id } })
}

export const DonorReviewService = {
  createDonorReviewIntoDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  getByIdFromDB,
}
