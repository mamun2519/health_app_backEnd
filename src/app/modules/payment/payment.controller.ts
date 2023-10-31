import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { PaymentService } from './payment.services'
import { JwtPayload } from 'jsonwebtoken'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
import { PaymentFilterAbleFiled } from './payment.constant'
import { paginationFiled } from '../../../constant/pagination'

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await PaymentService.createPayment(user.user_id, req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment Successfully',
    data: result,
  })
})
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = receiveArrayAndReturnObject(req.query, PaymentFilterAbleFiled)
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await PaymentService.getAllFromDB(filter, options)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment fetched Successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment fetched Successfully',
    data: result,
  })
})
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment delete Successfully',
    data: result,
  })
})
const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.updateByIdIntoDB(req.params.id, req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment update Successfully',
    data: result,
  })
})
const createCompanyBalance = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createCompanyBalance(req.body)
  sendApiResponse(res, {
    success: true,
    message: 'company initial balance created Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

const OrderAppointment = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const user = (req as JwtPayload).user
  const result = await PaymentService.OrderAppointment(
    req.body.appointment,
    req.body.payment,
    user?.user_id,
  )
  sendApiResponse(res, {
    success: true,
    message: 'Payment Was Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

const paymentByStripe = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.paymentByStripe(
    req.params.price as string,
  )
  sendApiResponse(res, {
    success: true,
    message: 'Payment Link Send Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

export const PaymentController = {
  createPayment,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  OrderAppointment,
  createCompanyBalance,
  paymentByStripe,
}
