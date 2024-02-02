import { PostComment, ReplyComment } from '@prisma/client'
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
//Reply Comment Services
const insertReplyCommentIntoDB = async (
  userId: string,
  replyComment: ReplyComment,
): Promise<ReplyComment> => {
  const user = await CheckUserByIdFromDB(userId)
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  replyComment.userId = userId
  return await prisma.replyComment.create({ data: replyComment })
}
const updateReplyCommentIntoDB = async (
  replyCommentId: string,
  replyComment: ReplyComment,
): Promise<ReplyComment> => {
  return await prisma.replyComment.update({
    where: { id: replyCommentId },
    data: replyComment,
  })
}
const deleteReplyCommentByIdFromDB = async (
  replyCommentId: string,
): Promise<ReplyComment | null> => {
  return await prisma.replyComment.delete({
    where: {
      id: replyCommentId,
    },
  })
}
const getReplyCommentByIdFromDB = async (
  replyCommentId: string,
): Promise<ReplyComment | null> => {
  return await prisma.replyComment.findFirst({
    where: {
      id: replyCommentId,
    },
  })
}
const myAllReplyCommentFromDB = async (
  userId: string,
): Promise<ReplyComment[]> => {
  return await prisma.replyComment.findMany({
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
  insertReplyCommentIntoDB,
  updateReplyCommentIntoDB,
  deleteReplyCommentByIdFromDB,
  getReplyCommentByIdFromDB,
  myAllReplyCommentFromDB,
}
