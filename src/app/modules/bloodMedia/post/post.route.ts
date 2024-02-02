import express from 'express'
import { auth } from '../../../middleware/auth'
import { USER_ROLE } from '../../../../enum/user'
import { PostController } from './post.controller'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.ADMIN, USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.DOCTOR),
  PostController.insertPost,
)
router.post(
  '/my-post',
  auth(USER_ROLE.ADMIN, USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.DOCTOR),
  PostController.myAllPost,
)
router.get('/all-post', PostController.retrieveAllPost)
router.get('/details/:id', PostController.getPostById)
router.patch('/update/:id', PostController.updatePostById)
router.delete('/delete/:id', PostController.deletePostById)

export const PostRoute = router
