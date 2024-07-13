'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.FriendController = void 0
const catchAsync_1 = __importDefault(require('../../../../shared/catchAsync'))
const APIResponse_1 = __importDefault(require('../../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const friend_services_1 = require('./friend.services')
const friendRequest = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user
    const result = yield friend_services_1.FriendService.friendRequestIntoDB(
      user.user_id,
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Friend Request  successfully',
      data: result,
    })
  }),
)
const friendRequestCancel = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield friend_services_1.FriendService.friendRequestCancelIntoDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Friend Request Cancel successfully',
      data: result,
    })
  }),
)
const friendRequestDelete = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield friend_services_1.FriendService.friendRequestDeleteFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Friend Request Delete successfully',
      data: result,
    })
  }),
)
const friendRequestDetails = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield friend_services_1.FriendService.friendRequestDetailsFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Friend Request Details successfully',
      data: result,
    })
  }),
)
const myAllFriendRequest = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user
    const result =
      yield friend_services_1.FriendService.myAllFriendRequestFromDB(
        user.user_id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Retrieve My Friend Request  successfully',
      data: result,
    })
  }),
)
// My Friend Controller
const acceptedFriend = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield friend_services_1.FriendService.acceptedFriendReqIntoDB(req.body)
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Accepted Friend Request  successfully',
      data: result,
    })
  }),
)
const acceptedFriendDelete = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield friend_services_1.FriendService.acceptedFriendReqDeleteFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Friend Delete successfully',
      data: result,
    })
  }),
)
const acceptedFriendDetails = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield friend_services_1.FriendService.acceptedFriendReqDetailsFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My Friend Retrieve Details successfully',
      data: result,
    })
  }),
)
const myAllFriend = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user
    const result = yield friend_services_1.FriendService.myAllFriendFromDB(
      user.user_id,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Retrieve My Friend   successfully',
      data: result,
    })
  }),
)
exports.FriendController = {
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
