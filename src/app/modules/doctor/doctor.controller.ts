/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { Doctor } from './doctor.service'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
import { doctorServiceFilterAbleFiled } from './doctor.constant'
import { paginationFiled } from '../../../constant/pagination'
import { JwtPayload } from 'jsonwebtoken'
import { ServicerAbleFiled } from './doctor.interface'

const createServiceIntoDB = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  console.log(user)
  const result = await Doctor.createServiceIntoDB(req.body, user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Service Create successfully',
    data: result,
  })
})

const myServiceFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user

  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await Doctor.myServiceFromDB(user.user_id, options)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Service fetch successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = receiveArrayAndReturnObject(
    req.query,
    doctorServiceFilterAbleFiled,
  )
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await Doctor.getAllFromDB(filter, options)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Service fetch successfully',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await Doctor.getByIdFromDB(
    req.params.id,
    req.query.date as string,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Service fetch successfully',
    data: result,
  })
})
const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await Doctor.updateByIdIntoDB(req.params.id, req.body)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Service update successfully',
    data: result,
  })
})
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await Doctor.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Service delete successfully',
    data: result,
  })
})
const myBookingAppointment = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await Doctor.myBookingAppointment(user.user_id, options)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My booking appointment fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const myActiveGoogleMeetService = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user

    const result = await Doctor.myActiveGoogleMeetService(user.user_id)
    sendApiResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'My active google meet fetched successfully',
      data: result,
    })
  },
)
const myCompletedGoogleMeetService = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user
    const options = receiveArrayAndReturnObject(req.query, paginationFiled)
    const result = await Doctor.myCompletedGoogleMeetService(
      user.user_id,
      options,
    )
    sendApiResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'My complete google meet fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)
const myPaymentList = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await Doctor.myPaymentList(user.user_id, options)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My payment list fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})
const myWithdrawList = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await Doctor.myWithdrawList(user.user_id, options)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My Withdraw list fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})
const allDoctorFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await Doctor.allDoctorFromDB()
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All Doctor fetched successfully',
    data: result,
  })
})

const getFilterServiceFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filersData = receiveArrayAndReturnObject(req.query, ServicerAbleFiled)
    const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)

    const result = await Doctor.getFilterServiceFromDB(filersData, pagination)
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Doctor services fetch successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)

export const DoctorController = {
  allDoctorFromDB,
  createServiceIntoDB,
  myServiceFromDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  myBookingAppointment,
  myActiveGoogleMeetService,
  myCompletedGoogleMeetService,
  myPaymentList,
  myWithdrawList,
  getFilterServiceFromDB,
}
