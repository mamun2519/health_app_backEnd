import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { MeetingRequestService } from './meetRequest.services'
import { JwtPayload } from 'jsonwebtoken'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
import { paginationFiled } from '../../../constant/pagination'

const createMeetingRequestIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user
    const result = await MeetingRequestService.createMeetingRequestIntoDB(
      user.user_id,
      req.body,
    )
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'MeetingRequest review Successfully',
      data: result,
    })
  },
)
const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MeetingRequestService.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'MeetingRequest review update Successfully',
    data: result,
  })
})
const doctorMeetingRequest = catchAsync(async (req: Request, res: Response) => {
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const user = (req as JwtPayload).user
  const result = await MeetingRequestService.doctorMeetingRequest(
    user.user_id,
    options,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My MeetingRequest fetched Successfully',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MeetingRequestService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'MeetingRequest review fetch Successfully',
    data: result,
  })
})
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MeetingRequestService.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'MeetingRequest review delete Successfully',
    data: result,
  })
})

export const MeetingRequestController = {
  createMeetingRequestIntoDB,
  updateByIdIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  doctorMeetingRequest,
}
