import { PostComment } from '@prisma/client'
import prisma from '../../../../prisma/prisma'
import { CheckUserByIdFromDB } from '../../../../shared/utils'
import { StatusCodes } from 'http-status-codes'
import Send_API_Error from '../../../../error/apiError'

const insertCommentIntoDB = async (
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

const updateCommentIntoDB = async (
  commentId: string,
  comment: PostComment,
): Promise<PostComment> => {
  return await prisma.postComment.update({
    where: { id: commentId },
    data: comment,
  })
}
const deleteCommentByIdFromDB = async (
  commentId: string,
): Promise<PostComment | null> => {
  return await prisma.postComment.delete({
    where: {
      id: commentId,
    },
  })
}
const getCommentByIdFromDB = async (
  commentId: string,
): Promise<PostComment | null> => {
  return await prisma.postComment.findFirst({
    where: {
      id: commentId,
    },
  })
}
const myAllCommentFromDB = async (userId: string): Promise<PostComment[]> => {
  return await prisma.postComment.findMany({
    where: {
      userId,
    },
  })
}

export const CommentService = {
  insertCommentIntoDB,
  updateCommentIntoDB,
  deleteCommentByIdFromDB,
  getCommentByIdFromDB,
  myAllCommentFromDB,
}
