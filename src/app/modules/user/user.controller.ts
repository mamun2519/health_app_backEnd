import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { UserService } from './user.service'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
import { paginationFiled } from '../../../constant/pagination'
import { JwtPayload } from 'jsonwebtoken'
import { UserFilterAbleFiled } from './user.constant'
import { DoctorAbleFiled } from './user.interface'

const filtersDoctorFromDB = catchAsync(async (req: Request, res: Response) => {
  const filersData = receiveArrayAndReturnObject(req.query, DoctorAbleFiled)
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)

  const result = await UserService.filtersDoctorFromDB(filersData, pagination)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Doctor fetch successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filter = receiveArrayAndReturnObject(req.query, UserFilterAbleFiled)
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await UserService.getAllFromDB(filter, options)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Fetched Success',
    data: result,
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Fetched Success',
    data: result,
  })
})
const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  //TODO - use Auth token user and send service auth user id
  const result = await UserService.updateByIdIntoDB(req.params.id, req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User update Successfully',
    data: result,
  })
})
const bloodDonorRequest = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  console.log(user)
  const result = await UserService.bloodDonorRequest(user.user_id, req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blood Donor Request Successfully',
    data: result,
  })
})

const myDonorRequest = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await UserService.myDonorRequest(user.user_id, pagination)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blood Donor Request Fetch Successfully',
    meta: result.meta,
    data: result.data,
  })
})
const myDonorReviewFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await UserService.myDonorReviewFromDB(user.user_id, pagination)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Donor review Request Fetch Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const myAppointment = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await UserService.myAppointment(user.user_id, pagination)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My Appointment Fetched Successfully',
    data: result,
  })
})

const myPrescription = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await UserService.myPrescription(user.user_id, pagination)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My Prescription Fetch Successfully',
    data: result,
  })
})

const myPaymentList = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await UserService.myPaymentList(user.user_id, pagination)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My Payment list Fetch Successfully',
    data: result,
  })
})

const userProfile = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user

  const result = await UserService.userProfile(user)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My Profile  Fetch Successfully',
    data: result,
  })
})
export const UserController = {
  getAllUser,
  getByIdFromDB,
  updateByIdIntoDB,
  bloodDonorRequest,
  myDonorRequest,
  myDonorReviewFromDB,
  myAppointment,
  myPrescription,
  myPaymentList,
  filtersDoctorFromDB,
  userProfile,
}
