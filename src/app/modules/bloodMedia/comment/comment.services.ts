import { PostComment } from '@prisma/client'
import prisma from '../../../../prisma/prisma'
import { CheckUserByIdFromDB } from '../../../../shared/utils'
import { StatusCodes } from 'http-status-codes'
import Send_API_Error from '../../../../error/apiError'

export const insertCommentIntoDB = async (
  userId: string,
  comment: PostComment,
): Promise<PostComment> => {
  const user = await CheckUserByIdFromDB(userId)
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  comment.userId = userId
  return await prisma.postComment.create({ data: comment })
}
