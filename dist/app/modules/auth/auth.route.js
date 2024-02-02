'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_controller_1 = require('./auth.controller')
const router = express_1.default.Router()
router.post('/create-user', auth_controller_1.AuthController.createUser)
router.post('/create-donor', auth_controller_1.AuthController.createDonor)
router.post('/create-doctor', auth_controller_1.AuthController.createDoctor)
router.post('/login', auth_controller_1.AuthController.userLogin)
router.post('/forget-password', auth_controller_1.AuthController.forgetPassword)
router.post('/reset-password', auth_controller_1.AuthController.resetPassword)
router.post('/username/:id', auth_controller_1.AuthController.changeUserName)
router.post(
  '/forget-request',
  auth_controller_1.AuthController.requestForgetPassword,
)
router.post(
  '/check-reset-code',
  auth_controller_1.AuthController.CheckValidationResetCode,
)
router.post(
  '/forget-code',
  auth_controller_1.AuthController.forgetPasswordWithCode,
)
exports.AuthRoutes = router
