import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'

import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { HaltReportServices } from './haltReport.services.route'

const insetIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await HaltReportServices.insetIntoDB(req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'HaltReport Added Successfully',
    data: result,
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await HaltReportServices.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'HaltReport fetched Successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await HaltReportServices.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'HaltReport deleted Successfully',
    data: result,
  })
})

const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await HaltReportServices.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'HaltReport updated Successfully',
    data: result,
  })
})

export const HaltReportController = {
  insetIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
}
