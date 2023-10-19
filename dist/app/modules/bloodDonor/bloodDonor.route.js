'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.BloodDonorRoutes = void 0
const express_1 = __importDefault(require('express'))
const bloodDonor_controller_1 = require('./bloodDonor.controller')
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const router = express_1.default.Router()
router.get(
  '/all-donor',
  bloodDonor_controller_1.BloodDonorController.getAllFromDB,
)
router.get(
  '/all-request',
  bloodDonor_controller_1.BloodDonorController.AllDonorRequest,
)
router.get(
  '/user-request',
  (0, auth_1.auth)(user_1.USER_ROLE.BLOODDONOR),
  bloodDonor_controller_1.BloodDonorController.userDonorRequest,
)
router.get(
  '/request/details/:id',
  bloodDonor_controller_1.BloodDonorController.getByIdDonorRequestFromDB,
)
router.get('/:id', bloodDonor_controller_1.BloodDonorController.getByIdFromDB)
router.get(
  '/',
  bloodDonor_controller_1.BloodDonorController.filtersBloodDonorFromDB,
)
router.patch(
  '/request',
  (0, auth_1.auth)(user_1.USER_ROLE.BLOODDONOR, user_1.USER_ROLE.USER),
  bloodDonor_controller_1.BloodDonorController
    .updateDonorRequestStatusByIdFromDB,
)
router.patch(
  '/update-request/:id',
  (0, auth_1.auth)(
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.SUPER_ADMIN,
  ),
  bloodDonor_controller_1.BloodDonorController.donorRequestUpdateByIdIntoDB,
)
router.delete(
  '/request/:id',
  (0, auth_1.auth)(
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.SUPER_ADMIN,
  ),
  bloodDonor_controller_1.BloodDonorController.deleteDonorRequestByIdFromDB,
)
exports.BloodDonorRoutes = router
