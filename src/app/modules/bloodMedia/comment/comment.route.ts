import express from 'express'
import { auth } from '../../../middleware/auth'
import { USER_ROLE } from '../../../../enum/user'
import { CommentController } from './comment.controller'

const router = express.Router()
router.get('/details/:id', CommentController.getCommentById)
router.patch('/update/:id', CommentController.updateCommentById)
router.delete('/delete/:id', CommentController.deleteCommentById)
router.post(
  '/create',
  auth(USER_ROLE.ADMIN, USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.DOCTOR),
  CommentController.insertComment,
)
router.get(
  '/my-comment',
  auth(USER_ROLE.ADMIN, USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.DOCTOR),
  CommentController.myAllComment,
)

export const CommentRoute = router
