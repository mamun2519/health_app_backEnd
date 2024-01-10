/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { BloodDonorService } from './bloodDonor.service'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
import { bloodDonorFilterAbleFiled } from './bloodDonor.constant'
import { paginationFiled } from '../../../constant/pagination'

const filtersBloodDonorFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filersData = receiveArrayAndReturnObject(
      req.query,
      bloodDonorFilterAbleFiled,
    )
    const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)

    const result = await BloodDonorService.filtersBloodDonorFromDB(
      filersData,
      pagination,
    )
    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blood donor fetch successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filersData = receiveArrayAndReturnObject(
    req.query,
    bloodDonorFilterAbleFiled,
  )
  // console.log(filersData)
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)

  const result = await BloodDonorService.getAllFromDB(pagination, filersData)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blood donor fetch successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  // const filersData = receiveArrayAndReturnObject(
  //   req.query,
  //   bloodDonorFilterAbleFiled,
  // )
  // const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)

  const result = await BloodDonorService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blood donor fetch successfully',
    // meta: result.meta,
    data: result,
  })
})
const userDonorRequest = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await BloodDonorService.userDonorRequest(
    user.user_id,
    pagination,
  )

  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blood Donor Request Fetch Successfully',
    meta: result.meta,
    data: result.data,
  })
})
const AllDonorRequest = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filersData = receiveArrayAndReturnObject(
    req.query,
    bloodDonorFilterAbleFiled,
  )
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await BloodDonorService.AllDonorRequest(filersData, pagination)

  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Donor Request Fetch Successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getByIdDonorRequestFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BloodDonorService.getByIdDonorRequestFromDB(
      req.params.id,
    )

    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blood Donor Request Fetch Successfully',
      data: result,
    })
  },
)
const updateDonorRequestStatusByIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user
    const result = await BloodDonorService.updateDonorRequestStatusByIdFromDB(
      user,
      req.body,
    )

    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Donor Request Status Update Successfully',
      data: result,
    })
  },
)
const donorRequestUpdateByIdIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BloodDonorService.donorRequestUpdateByIdIntoDB(
      req.params.id,
      req.body,
    )

    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Donor Request Update Successfully',
      data: result,
    })
  },
)
const deleteDonorRequestByIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BloodDonorService.deleteDonorRequestByIdFromDB(
      req.params.id,
    )

    sendApiResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Donor Request delete Successfully',
      data: result,
    })
  },
)
export const BloodDonorController = {
  filtersBloodDonorFromDB,
  getAllFromDB,
  getByIdFromDB,
  userDonorRequest,
  getByIdDonorRequestFromDB,
  updateDonorRequestStatusByIdFromDB,
  donorRequestUpdateByIdIntoDB,
  deleteDonorRequestByIdFromDB,
  AllDonorRequest,
}
