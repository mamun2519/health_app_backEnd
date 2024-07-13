'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.CommentRoute = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../../middleware/auth')
const user_1 = require('../../../../enum/user')
const comment_controller_1 = require('./comment.controller')
const router = express_1.default.Router()
router.get(
  '/details/:id',
  comment_controller_1.CommentController.getCommentById,
)
router.patch(
  '/update/:id',
  comment_controller_1.CommentController.updateCommentById,
)
router.delete(
  '/delete/:id',
  comment_controller_1.CommentController.deleteCommentById,
)
router.get(
  '/reply/details/:id',
  comment_controller_1.CommentController.getReplyCommentById,
)
router.patch(
  'reply/update/:id',
  comment_controller_1.CommentController.updateReplyCommentById,
)
router.delete(
  'reply/delete/:id',
  comment_controller_1.CommentController.deleteReplyCommentById,
)
router.post(
  '/create',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  comment_controller_1.CommentController.insertComment,
)
router.post(
  'reply/create',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  comment_controller_1.CommentController.insertReplyComment,
)
router.get(
  '/reply/my-comment',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  comment_controller_1.CommentController.myAllReplyComment,
)
exports.CommentRoute = router
