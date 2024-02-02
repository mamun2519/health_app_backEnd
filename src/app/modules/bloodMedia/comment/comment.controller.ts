import { Request, Response } from 'express'
import catchAsync from '../../../../shared/catchAsync'
import { CommentService } from './comment.services'
import sendApiResponse from '../../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'

const insertComment = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await CommentService.insertCommentIntoDB(
    user.user_id,
    req.body.post,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment successfully',
    data: result,
  })
})
const myAllComment = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await CommentService.myAllCommentFromDB(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My All Comment Retrieve successfully',
    data: result,
  })
})
const myAllComment = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await CommentService.myAllCommentFromDB(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My All Comment Retrieve successfully',
    data: result,
  })
})

const myAllComment = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await CommentService.myAllCommentFromDB(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My All Comment Retrieve successfully',
    data: result,
  })
})
const myAllComment = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await CommentService.myAllCommentFromDB(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My All Comment Retrieve successfully',
    data: result,
  })
})

export const CommentController = {
  insertComment,
  myAllComment,
}
