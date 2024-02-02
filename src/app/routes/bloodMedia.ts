import express from 'express'
import { PostRoute } from '../modules/bloodMedia/post/post.route'

const router = express.Router()

const allModulesRoutes = [
  {
    path: '/post',
    route: PostRoute,
  },
]

allModulesRoutes.forEach(route => router.use(route.path, route.route))

export const BloodMediaRoutes = router
