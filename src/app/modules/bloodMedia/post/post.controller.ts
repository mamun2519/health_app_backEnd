import { Request, Response } from 'express'
import catchAsync from '../../../../shared/catchAsync'
import { PostService } from './post.services'
import sendApiResponse from '../../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'

const insertPost = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await PostService.insertPostIntoDB(
    user.user_id,
    req.body.post,
    req.body.avatar,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Post Create successfully',
    data: result,
  })
})
const retrieveAllPost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.retrieveAllPostFromDB()
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Post retrieve successfully',
    data: result,
  })
})

const myAllPost = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await PostService.myAllPostFromDB(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Retrieve My All Post successfully',
    data: result,
  })
})

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.getPostByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Post Retrieve successfully',
    data: result,
  })
})

const updatePostById = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.updatePostByIdIntoDB(
    req.body.post,
    req.body.avatar,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Post Update successfully',
    data: result,
  })
})

const deletePostById = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.deletePostByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Post Delete successfully',
    data: result,
  })
})

export const PostController = {
  insertPost,
  myAllPost,
  deletePostById,
  updatePostById,
  getPostById,
  retrieveAllPost,
}
