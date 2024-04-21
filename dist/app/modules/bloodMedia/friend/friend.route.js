'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.FriendRoute = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../../middleware/auth')
const user_1 = require('../../../../enum/user')
const friend_controller_1 = require('./friend.controller')
const router = express_1.default.Router()
router.post(
  '/request',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  friend_controller_1.FriendController.friendRequest,
)
router.patch(
  '/request-cancel',
  friend_controller_1.FriendController.friendRequestCancel,
)
router.delete(
  '/request-delete/:id',
  friend_controller_1.FriendController.friendRequestDelete,
)
router.get(
  '/request-details/:id',
  friend_controller_1.FriendController.friendRequestDetails,
)
router.get(
  '/my-request',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  friend_controller_1.FriendController.myAllFriendRequest,
)
//my Friend Request
router.post(
  '/accepted',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  friend_controller_1.FriendController.acceptedFriend,
)
router.delete(
  '/accepted-delete/:id',
  friend_controller_1.FriendController.acceptedFriendDelete,
)
router.get(
  '/accepted-details/:id',
  friend_controller_1.FriendController.acceptedFriendDetails,
)
router.get(
  '/my-friend-accepted',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  friend_controller_1.FriendController.myAllFriend,
)
exports.FriendRoute = router
