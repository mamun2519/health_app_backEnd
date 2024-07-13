'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.PostRoute = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../../middleware/auth')
const user_1 = require('../../../../enum/user')
const post_controller_1 = require('./post.controller')
const router = express_1.default.Router()
router.post(
  '/create',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  post_controller_1.PostController.insertPost,
)
router.post(
  '/my-post',
  (0, auth_1.auth)(
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.DOCTOR,
  ),
  post_controller_1.PostController.myAllPost,
)
router.get('/all-post', post_controller_1.PostController.retrieveAllPost)
router.get('/details/:id', post_controller_1.PostController.getPostById)
router.patch('/update/:id', post_controller_1.PostController.updatePostById)
router.delete('/delete/:id', post_controller_1.PostController.deletePostById)
exports.PostRoute = router
