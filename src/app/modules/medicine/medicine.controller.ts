import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'

import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { MedicineServices } from './medicine.services'

const insetIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MedicineServices.insetIntoDB(req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Medicine Added Successfully',
    data: result,
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MedicineServices.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Medicine fetched Successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MedicineServices.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Medicine deleted Successfully',
    data: result,
  })
})

const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MedicineServices.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Medicine updated Successfully',
    data: result,
  })
})

export const MedicineController = {
  insetIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
}
