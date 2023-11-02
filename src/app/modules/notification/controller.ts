import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendApiResponse from '../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { NotificationService } from './services'

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.deleteByIdFromDB(req.params.id)
  sendApiResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Notification deleted successfully',
    data: result,
  })
})

export const NotificationController = {
  deleteByIdFromDB,
}
