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
    req.body.comment,
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
const getCommentById = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getCommentByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single Comment Retrieve successfully',
    data: result,
  })
})
const updateCommentById = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.updateCommentIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: ' Comment Update successfully',
    data: result,
  })
})

const deleteCommentById = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.deleteCommentByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment Delete successfully',
    data: result,
  })
})
// ReplyCommentController
const insertReplyComment = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await CommentService.insertReplyCommentIntoDB(
    user.user_id,
    req.body.comment,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Reply Comment successfully',
    data: result,
  })
})
const myAllReplyComment = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await CommentService.myAllReplyCommentFromDB(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My All Reply Comment Retrieve successfully',
    data: result,
  })
})
const getReplyCommentById = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getReplyCommentByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Reply Comment Retrieve successfully',
    data: result,
  })
})
const updateReplyCommentById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentService.updateReplyCommentIntoDB(
      req.params.id,
      req.body,
    )
    sendApiResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Reply Comment Update successfully',
      data: result,
    })
  },
)

const deleteReplyCommentById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentService.deleteReplyCommentByIdFromDB(
      req.params.id,
    )
    sendApiResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Reply Comment Delete successfully',
      data: result,
    })
  },
)
export const CommentController = {
  insertComment,
  myAllComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  insertReplyComment,
  myAllReplyComment,
  getReplyCommentById,
  updateReplyCommentById,
  deleteReplyCommentById,
}
