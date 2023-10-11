import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { JwtPayload } from 'jsonwebtoken'
import { AppointmentService } from './appointment.services'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
import { AppointmentFilterAbleFiled } from './appointment.constant'
import { paginationFiled } from '../../../constant/pagination'

const insetIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await AppointmentService.insetIntoDB(req.body, user.user_id)
  sendApiResponse(res, {
    success: true,
    message: 'Appointment booking Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = receiveArrayAndReturnObject(
    req.query,
    AppointmentFilterAbleFiled,
  )
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await AppointmentService.getAllFromDB(filter, options)
  sendApiResponse(res, {
    success: true,
    message: 'Appointment fetched Successfully',
    statusCode: StatusCodes.OK,
    meta: result.meta,
    data: result.data,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    message: 'Appointment fetched Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    success: true,
    message: 'Appointment updated Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    message: 'Appointment deleted Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

export const AppointmentController = {
  insetIntoDB,
  deleteByIdFromDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
}
