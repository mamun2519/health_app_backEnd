'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserRoutes = void 0
const express_1 = __importDefault(require('express'))
const user_controller_1 = require('./user.controller')
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const router = express_1.default.Router()
router.patch(
  '/update',
  (0, auth_1.auth)(
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.DOCTOR,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.SUPER_ADMIN,
  ),
  user_controller_1.UserController.updateUserProfile,
)
router.get(
  '/my-notification',
  (0, auth_1.auth)(
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.DOCTOR,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.SUPER_ADMIN,
  ),
  user_controller_1.UserController.myNotification,
)
router.get(
  '/filterDoctor',
  user_controller_1.UserController.filtersDoctorFromDB,
)
router.get('/all-user', user_controller_1.UserController.AllUserFromDb)
router.get('/all-admin', user_controller_1.UserController.AllAdminFromDB)
router.post(
  '/request-donor',
  (0, auth_1.auth)(
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.DOCTOR,
  ),
  user_controller_1.UserController.bloodDonorRequest,
)
router.get(
  '/my-donor-request',
  (0, auth_1.auth)(
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.DOCTOR,
  ),
  user_controller_1.UserController.myDonorRequest,
)
router.get(
  '/my-donor-review',
  (0, auth_1.auth)(user_1.USER_ROLE.USER),
  user_controller_1.UserController.myDonorReviewFromDB,
)
router.get(
  '/my-appointment',
  (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.BLOODDONOR),
  user_controller_1.UserController.myAppointment,
)
router.get(
  '/my-prescription',
  (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.BLOODDONOR),
  user_controller_1.UserController.myPrescription,
)
router.get(
  '/my-profile',
  (0, auth_1.auth)(
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.DOCTOR,
    user_1.USER_ROLE.SUPER_ADMIN,
  ),
  user_controller_1.UserController.userProfile,
)
router.get(
  '/my-payment',
  (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.BLOODDONOR),
  user_controller_1.UserController.myPaymentList,
)
router.delete('/delete-user/:id', user_controller_1.UserController.deleteUser)
router.get('/', user_controller_1.UserController.getAllUser)
router.get('/:id', user_controller_1.UserController.getByIdFromDB)
router.patch(
  '/:id',
  (0, auth_1.auth)(
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.DOCTOR,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.SUPER_ADMIN,
  ),
  user_controller_1.UserController.updateByIdIntoDB,
)
exports.UserRoutes = router
