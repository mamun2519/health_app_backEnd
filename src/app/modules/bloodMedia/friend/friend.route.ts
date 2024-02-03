import express from 'express'
import { auth } from '../../../middleware/auth'
import { USER_ROLE } from '../../../../enum/user'
import { FriendController } from './friend.controller'

const router = express.Router()

router.post(
  '/request',
  auth(USER_ROLE.ADMIN, USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.DOCTOR),
  FriendController.friendRequest,
)
router.patch('/request-cancel', FriendController.friendRequestCancel)

router.delete('/request-delete/:id', FriendController.friendRequestDelete)
router.get('/request-details/:id', FriendController.friendRequestDetails)
router.get(
  '/my-request',
  auth(USER_ROLE.ADMIN, USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.DOCTOR),
  FriendController.myAllFriendRequest,
)
//my Friend Request
router.post(
  '/accepted',
  auth(USER_ROLE.ADMIN, USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.DOCTOR),
  FriendController.acceptedFriend,
)
router.delete('/accepted-delete/:id', FriendController.acceptedFriendDelete)

router.get('/accepted-details/:id', FriendController.acceptedFriendDetails)
router.get(
  '/my-friend-accepted',
  auth(USER_ROLE.ADMIN, USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.DOCTOR),
  FriendController.myAllFriend,
)
export const FriendRoute = router
