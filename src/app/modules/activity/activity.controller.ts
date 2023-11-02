import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { JwtPayload } from 'jsonwebtoken'
import { ActivityService } from './activity.services'

const userActivity = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await ActivityService.userActivity(user.user_id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Activity  successfully',
    data: result,
  })
})

export const ActivityController = {
  userActivity,
}
