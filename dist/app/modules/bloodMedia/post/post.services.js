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
exports.PostService = void 0
const prisma_1 = __importDefault(require('../../../../prisma/prisma'))
const apiError_1 = __importDefault(require('../../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const utils_1 = require('../../../../shared/utils')
const insertPostIntoDB = (user_id, post, avatar) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.CheckUserByIdFromDB)(user_id)
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        post.userId = user_id
        const createPost = yield transactionClient.post.create({ data: post })
        if (avatar) {
          avatar.postId = createPost.id
          yield transactionClient.postAvatar.create({ data: avatar })
        }
        return createPost
      }),
    )
    return result
  })
const retrieveAllPostFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.post.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        likeUsers: true,
        commentUser: true,
      },
    })
  })
const getPostByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma_1.default.post.findFirst({
      where: {
        id: id,
      },
    })
    return post
  })
const updatePostByIdIntoDB = (post, avatar) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        var _a
        const updatePost = yield transactionClient.post.update({
          where: {
            id: post.id,
          },
          data: post,
        })
        if (avatar) {
          yield prisma_1.default.postAvatar.updateMany({
            where: {
              postId:
                (_a = avatar[0]) === null || _a === void 0 ? void 0 : _a.postId,
            },
            data: avatar,
          })
        }
        return updatePost
      }),
    )
    return result
  })
const deletePostByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.post.delete({ where: { id } })
  })
const myAllPostFromDB = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.CheckUserByIdFromDB)(userId)
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    return prisma_1.default.post.findMany({
      where: {
        userId,
      },
    })
  })
exports.PostService = {
  insertPostIntoDB,
  retrieveAllPostFromDB,
  getPostByIdFromDB,
  updatePostByIdIntoDB,
  deletePostByIdFromDB,
  myAllPostFromDB,
}
