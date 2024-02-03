import express from 'express'
import { PostRoute } from '../modules/bloodMedia/post/post.route'
import { CommentRoute } from '../modules/bloodMedia/comment/comment.route'
import { FriendRoute } from '../modules/bloodMedia/friend/friend.route'

const router = express.Router()

const allModulesRoutes = [
  {
    path: '/post',
    route: PostRoute,
  },
  {
    path: '/post/comment',
    route: CommentRoute,
  },
  {
    path: '/friend',
    route: FriendRoute,
  },
]

allModulesRoutes.forEach(route => router.use(route.path, route.route))

export const BloodMediaRoutes = router
