import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { GoogleMeetService } from './googleMeet.services'
import { JwtPayload } from 'jsonwebtoken'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
import { paginationFiled } from '../../../constant/pagination'

const insetIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await GoogleMeetService.insetIntoDB(user.user_id, req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Google Meet created Successfully',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await GoogleMeetService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Google Meet fetched Successfully',
    data: result,
  })
})

const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await GoogleMeetService.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Google Meet updated Successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await GoogleMeetService.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Google Meet deleted Successfully',
    data: result,
  })
})
const updateStatusAndDeleteGoogleMeet = catchAsync(
  async (req: Request, res: Response) => {
    const result = await GoogleMeetService.updateStatusAndDeleteGoogleMeet(
      req.params.id,
    )
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Google Meet updated Successfully',
      data: result,
    })
  },
)

const getAllActiveMeetFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const options = receiveArrayAndReturnObject(req.query, paginationFiled)
    const result = await GoogleMeetService.getAllActiveMeetFromDB(options)
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Google Meet Active fetched Successfully',
      data: result,
    })
  },
)
export const GoogleMeetController = {
  insetIntoDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  updateStatusAndDeleteGoogleMeet,
  getAllActiveMeetFromDB,
}
