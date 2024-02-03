import { Request, Response } from 'express'
import catchAsync from '../../../../shared/catchAsync'

import sendApiResponse from '../../../../shared/APIResponse'
import { StatusCodes } from 'http-status-codes'
import { FriendService } from './friend.services'

const friendRequest = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await FriendService.friendRequestIntoDB(user.user_id, req.body)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Friend Request  successfully',
    data: result,
  })
})
const friendRequestCancel = catchAsync(async (req: Request, res: Response) => {
  const result = await FriendService.friendRequestCancelIntoDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Friend Request Cancel successfully',
    data: result,
  })
})
const friendRequestDelete = catchAsync(async (req: Request, res: Response) => {
  const result = await FriendService.friendRequestDeleteFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Friend Request Delete successfully',
    data: result,
  })
})
const friendRequestDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await FriendService.friendRequestDetailsFromDB(req.params.id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Friend Request Details successfully',
    data: result,
  })
})

const myAllFriendRequest = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await FriendService.myAllFriendRequestFromDB(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Retrieve My Friend Request  successfully',
    data: result,
  })
})
// My Friend Controller
const acceptedFriend = catchAsync(async (req: Request, res: Response) => {
  const result = await FriendService.acceptedFriendReqIntoDB(req.body)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Accepted Friend Request  successfully',
    data: result,
  })
})
const acceptedFriendDelete = catchAsync(async (req: Request, res: Response) => {
  const result = await FriendService.acceptedFriendReqDeleteFromDB(
    req.params.id,
  )
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Friend Delete successfully',
    data: result,
  })
})

const acceptedFriendDetails = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FriendService.acceptedFriendReqDetailsFromDB(
      req.params.id,
    )
    sendApiResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'My Friend Retrieve Details successfully',
      data: result,
    })
  },
)

const myAllFriend = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user
  const result = await FriendService.myAllFriendFromDB(user.user_id)
  sendApiResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Retrieve My Friend   successfully',
    data: result,
  })
})
export const FriendController = {
  friendRequest,
  friendRequestCancel,
  friendRequestDelete,
  friendRequestDetails,
  myAllFriendRequest,
  acceptedFriend,
  acceptedFriendDelete,
  acceptedFriendDetails,
  myAllFriend,
}
