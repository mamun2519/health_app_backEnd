import { FriendRequest, MyFriend } from '@prisma/client'
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

const friendRequestCancelIntoDB = async (
  id: string,
): Promise<FriendRequest | null> => {
  return await prisma.friendRequest.update({
    where: { id: id },
    data: {
      status: 'Cancel',
    },
  })
}
const friendRequestDeleteFromDB = async (
  id: string,
): Promise<FriendRequest | null> => {
  return await prisma.friendRequest.delete({
    where: { id: id },
  })
}
const friendRequestDetailsFromDB = async (
  id: string,
): Promise<FriendRequest | null> => {
  return await prisma.friendRequest.findFirst({
    where: { id: id },
    include: {
      user: {
        include: { profile: true },
      },
      requester: true,
    },
  })
}
// friend service
const acceptedFriendReqIntoDB = async (data: MyFriend): Promise<MyFriend> => {
  return await prisma.myFriend.create({ data })
}
const acceptedFriendReqDeleteFromDB = async (
  id: string,
): Promise<MyFriend | null> => {
  return await prisma.myFriend.delete({
    where: { id: id },
  })
}
const acceptedFriendReqDetailsFromDB = async (
  id: string,
): Promise<MyFriend | null> => {
  return await prisma.myFriend.findFirst({
    where: { id: id },
    include: {
      user: {
        include: { profile: true },
      },
      friend: true,
    },
  })
}

const myAllFriendFromDB = async (userId: string): Promise<MyFriend[]> => {
  const user = await CheckUserByIdFromDB(userId)
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  const profile = await prisma.profile.findFirst({ where: { user_id: userId } })
  return await prisma.myFriend.findMany({
    where: {
      friendId: profile?.id,
    },
    include: {
      user: {
        include: { profile: true },
      },
    },
  })
}
export const FriendService = {
  friendRequestIntoDB,
  friendRequestCancelIntoDB,
  friendRequestDeleteFromDB,
  friendRequestDetailsFromDB,
  acceptedFriendReqIntoDB,
  acceptedFriendReqDeleteFromDB,
  acceptedFriendReqDetailsFromDB,
  myAllFriendFromDB,
}
