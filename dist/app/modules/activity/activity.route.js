'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ActivityRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const activity_controller_1 = require('./activity.controller')
const router = express_1.default.Router()
router.get(
  '/user',
  (0, auth_1.auth)(user_1.USER_ROLE.USER),
  activity_controller_1.ActivityController.userActivity,
)
router.get(
  '/donor',
  (0, auth_1.auth)(user_1.USER_ROLE.BLOODDONOR),
  activity_controller_1.ActivityController.donorActivity,
)
router.get(
  '/doctor',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  activity_controller_1.ActivityController.doctorActivity,
)
router.get(
  '/admin',
  (0, auth_1.auth)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.SUPER_ADMIN),
  activity_controller_1.ActivityController.adminActivity,
)
exports.ActivityRoutes = router
