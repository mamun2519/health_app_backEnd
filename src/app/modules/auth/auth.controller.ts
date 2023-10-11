import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import catchAsync from '../../../shared/catchAsync'
import { env_config } from '../../../config'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUserFromDB(req.body)
  console.log(result)
  const { user, token } = result
  //set refresh token into cookie
  const cookieOptions = {
    secure: env_config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', cookieOptions)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Create Successfully!',
    data: {
      user,
      userToken: token.accessToken,
    },
  })
})

const createDonor = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createBloodDonorFromDB(req.body)
  const { user, token } = result
  //set refresh token into cookie
  const cookieOptions = {
    secure: env_config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', cookieOptions)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Create Successfully!',
    data: {
      user,
      userToken: token.accessToken,
    },
  })
})

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createDoctorFromDB(req.body)
  const { user, token } = result
  //set refresh token into cookie
  const cookieOptions = {
    secure: env_config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', cookieOptions)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Create Successfully!',
    data: {
      user,
      userToken: token.accessToken,
    },
  })
})

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userLoginIntoDB(req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Login Successfully!',
    data: result,
  })
})
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.forgetPasswordIntoDB(req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password forget Successfully!',
    data: result,
  })
})
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.resetPasswordIntoDB(req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password reset Successfully!',
    data: result,
  })
})
const changeUserName = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.changeUserNameIntoDB(req.params.id, req.body)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Username change Successfully!',
    data: result,
  })
})

export const AuthController = {
  createUser,
  createDonor,
  createDoctor,
  userLogin,
  forgetPassword,
  resetPassword,
  changeUserName,
}
