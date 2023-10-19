import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'

import { JwtPayload } from 'jsonwebtoken'
import { ServiceReviewServices } from './serviceReview.services'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'

const insetIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await ServiceReviewServices.insetIntoDB(user.user_id, req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review Added Successfully',
    data: result,
  })
})

const myReview = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await ServiceReviewServices.myReview(user.userId)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review fetched Successfully',
    data: result,
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceReviewServices.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review fetched Successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceReviewServices.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review deleted Successfully',
    data: result,
  })
})

const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceReviewServices.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review updated Successfully',
    data: result,
  })
})

const getServiceWithReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceReviewServices.getServiceWithReview(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review fetch Successfully',
    data: result,
  })
})
const getAllReviewFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceReviewServices.getAllReviewFromDb()
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review fetch Successfully',
    data: result,
  })
})
export const ServiceReviewController = {
  getAllReviewFromDb,
  insetIntoDB,
  myReview,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getServiceWithReview,
}
