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
exports.FriendService = void 0
const utils_1 = require('../../../../shared/utils')
const apiError_1 = __importDefault(require('../../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const prisma_1 = __importDefault(require('../../../../prisma/prisma'))
const friendRequestIntoDB = (userId, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.CheckUserByIdFromDB)(userId)
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    data.userId = userId
    return yield prisma_1.default.friendRequest.create({ data })
  })
const friendRequestCancelIntoDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.friendRequest.update({
      where: { id: id },
      data: {
        status: 'Cancel',
      },
    })
  })
const friendRequestDeleteFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.friendRequest.delete({
      where: { id: id },
    })
  })
const friendRequestDetailsFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.friendRequest.findFirst({
      where: { id: id },
      include: {
        user: {
          include: { profile: true },
        },
        requester: true,
      },
    })
  })
const myAllFriendRequestFromDB = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.CheckUserByIdFromDB)(userId)
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    return yield prisma_1.default.friendRequest.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          include: { profile: true },
        },
        requester: {
          include: {
            user: true,
          },
        },
      },
    })
  })
// friend service
const acceptedFriendReqIntoDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.myFriend.create({ data })
  })
const acceptedFriendReqDeleteFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.myFriend.delete({
      where: { id: id },
    })
  })
const acceptedFriendReqDetailsFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.myFriend.findFirst({
      where: { id: id },
      include: {
        user: {
          include: { profile: true },
        },
        friend: true,
      },
    })
  })
const myAllFriendFromDB = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.CheckUserByIdFromDB)(userId)
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    const profile = yield prisma_1.default.profile.findFirst({
      where: { user_id: userId },
    })
    return yield prisma_1.default.myFriend.findMany({
      where: {
        friendId: profile === null || profile === void 0 ? void 0 : profile.id,
      },
      include: {
        user: {
          include: { profile: true },
        },
      },
    })
  })
exports.FriendService = {
  friendRequestIntoDB,
  friendRequestCancelIntoDB,
  friendRequestDeleteFromDB,
  friendRequestDetailsFromDB,
  acceptedFriendReqIntoDB,
  acceptedFriendReqDeleteFromDB,
  acceptedFriendReqDetailsFromDB,
  myAllFriendFromDB,
  myAllFriendRequestFromDB,
}
