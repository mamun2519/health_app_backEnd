import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { JwtPayload } from 'jsonwebtoken'

import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { PrescriptionService } from './prescription.services'
import { receiveArrayAndReturnObject } from '../../../shared/pick'

import { paginationFiled } from '../../../constant/pagination'
import { PrescriptionFilterAbleFiled } from '../serviceOffer/serviceOffer.constant'

const insetIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await PrescriptionService.insetIntoDB(req.body, user.user_id)
  sendApiResponse(res, {
    success: true,
    message: 'Prescription booking Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})
const doctorAssignPrescription = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user
    const options = receiveArrayAndReturnObject(req.query, paginationFiled)
    const result = await PrescriptionService.doctorAssignPrescription(
      user.user_id,
      options,
    )
    sendApiResponse(res, {
      success: true,
      message: 'Prescription booking Successfully',
      statusCode: StatusCodes.OK,
      data: result,
    })
  },
)

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = receiveArrayAndReturnObject(
    req.query,
    PrescriptionFilterAbleFiled,
  )
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await PrescriptionService.getAllFromDB(filter, options)
  sendApiResponse(res, {
    success: true,
    message: 'Prescription fetched Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PrescriptionService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    message: 'Prescription fetched Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PrescriptionService.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    success: true,
    message: 'Prescription updated Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PrescriptionService.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    message: 'Prescription deleted Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  })
})

export const PrescriptionController = {
  insetIntoDB,
  deleteByIdFromDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  doctorAssignPrescription,
}
