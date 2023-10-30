import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { DonorReviewService } from './donorReview.service'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'

const createDonorReviewIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (req as any).user
    const result = await DonorReviewService.createDonorReviewIntoDB(
      user.user_id,
      req.body,
    )
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Donor review Successfully',
      data: result,
    })
  },
)
const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DonorReviewService.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Donor review update Successfully',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DonorReviewService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Donor review fetch Successfully',
    data: result,
  })
})
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DonorReviewService.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Donor review delete Successfully',
    data: result,
  })
})

const getSpecificReview = catchAsync(async (req: Request, res: Response) => {
  const result = await DonorReviewService.SpecificReview(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get Specific Review Successfully',
    data: result,
  })
})

export const DonorReviewController = {
  createDonorReviewIntoDB,
  updateByIdIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  getSpecificReview,
}
