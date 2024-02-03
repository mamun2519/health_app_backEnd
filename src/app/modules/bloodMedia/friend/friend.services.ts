import { FriendRequest } from '@prisma/client'
import { CheckUserByIdFromDB } from '../../../../shared/utils'
import Send_API_Error from '../../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../../prisma/prisma'

const friendRequestIntoDB = async (
  userId: string,
  data: FriendRequest,
): Promise<FriendRequest> => {
  const user = await CheckUserByIdFromDB(userId)
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  data.userId = userId
  return await prisma.friendRequest.create({ data })
}

export const FriendService = {
  friendRequestIntoDB,
}
