import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { WithdrawServices } from './withdraw.services'
import { JwtPayload } from 'jsonwebtoken'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
import { WithdrawFilterAbleFiled } from './withdrow.constant'
import { paginationFiled } from '../../../constant/pagination'

const doctorWithDrawRequest = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user
    const result = await WithdrawServices.doctorWithDrawRequest(
      user.user_id,
      req.body,
    )
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Payment Withdraw Request sent successfully',
      data: result,
    })
  },
)

const withdrawAccepted = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  console.log('body', req.body)
  const result = await WithdrawServices.withdrawAccepted(
    user.user_id,
    req.body.data,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment Withdraw Request Accepted successfully',
    data: result,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = receiveArrayAndReturnObject(req.query, WithdrawFilterAbleFiled)
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await WithdrawServices.getAllFromDB(filter, options)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment Withdraw Fetched successfully',
    data: result,
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await WithdrawServices.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment Withdraw Fetched successfully',
    data: result,
  })
})
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await WithdrawServices.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment Withdraw deleted successfully',
    data: result,
  })
})
const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await WithdrawServices.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment Withdraw Fetched successfully',
    data: result,
  })
})

export const WithdrawController = {
  doctorWithDrawRequest,
  withdrawAccepted,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
}
