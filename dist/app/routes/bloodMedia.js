'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.BloodMediaRoutes = void 0
const express_1 = __importDefault(require('express'))
const post_route_1 = require('../modules/bloodMedia/post/post.route')
const comment_route_1 = require('../modules/bloodMedia/comment/comment.route')
const friend_route_1 = require('../modules/bloodMedia/friend/friend.route')
const router = express_1.default.Router()
const allModulesRoutes = [
  {
    path: '/post',
    route: post_route_1.PostRoute,
  },
  {
    path: '/post/comment',
    route: comment_route_1.CommentRoute,
  },
  {
    path: '/friend',
    route: friend_route_1.FriendRoute,
  },
]
allModulesRoutes.forEach(route => router.use(route.path, route.route))
exports.BloodMediaRoutes = router
