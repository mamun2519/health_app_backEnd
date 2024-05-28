import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ServiceOfferService } from './serviceOffer.service'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { JwtPayload } from 'jsonwebtoken'
import { receiveArrayAndReturnObject } from '../../../shared/pick'
// import { ServiceOfferFilterAbleFiled } from '../prescription/prescription.constant'
import { paginationFiled } from '../../../constant/pagination'
import { ServiceOfferFilterAbleFiled } from './serviceOffer.constant'

const insetIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await ServiceOfferService.insetIntoDB(req.body, user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offer Create success!',
    data: result,
  })
})
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = receiveArrayAndReturnObject(
    req.query,
    ServiceOfferFilterAbleFiled,
  )
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await ServiceOfferService.getAllFromDB(filter, options)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offer fetched success!',
    data: result,
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceOfferService.getByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offer fetch success!',
    data: result,
  })
})
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceOfferService.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offer delete success!',
    data: result,
  })
})

const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceOfferService.updateByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offer update success!',
    data: result,
  })
})

const doctorOfferService = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await ServiceOfferService.doctorOfferService(
    user.user_id,
    options,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offer fetched success!',
    data: result,
  })
})

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user

  // const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await ServiceOfferService.createCart(user.user_id, req.body)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Cart create fetched success!',
    data: result,
  })
})
const MyCart = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  // const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await ServiceOfferService.MyCart(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My Cart Fetch fetched success!',
    data: result,
  })
})
const singleCartDelete = catchAsync(async (req: Request, res: Response) => {
  // const options = receiveArrayAndReturnObject(req.query, paginationFiled)
  const result = await ServiceOfferService.singleCartDelete(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My Cart Fetch fetched success!',
    data: result,
  })
})

export const OfferServiceController = {
  addToCart,
  insetIntoDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  getAllFromDB,
  MyCart,
  doctorOfferService,
  singleCartDelete,
}
