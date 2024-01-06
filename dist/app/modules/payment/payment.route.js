'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.PaymentRoute = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const payment_controller_1 = require('./payment.controller')
const route = express_1.default.Router()
route.get(
  '/stripe/:price',
  payment_controller_1.PaymentController.paymentByStripe,
)
route.delete(
  '/:id',
  (0, auth_1.auth)(
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.ADMIN,
  ),
  payment_controller_1.PaymentController.deleteByIdFromDB,
)
route.post(
  '/',
  (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.BLOODDONOR),
  payment_controller_1.PaymentController.createPayment,
)
route.post(
  '/booking',
  (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.BLOODDONOR),
  payment_controller_1.PaymentController.OrderAppointment,
)
route.get('/:id', payment_controller_1.PaymentController.getByIdFromDB)
route.get('/', payment_controller_1.PaymentController.getAllFromDB)
route.patch(
  '/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.DOCTOR),
  payment_controller_1.PaymentController.updateByIdIntoDB,
)
route.post(
  '/create-balance',
  payment_controller_1.PaymentController.createCompanyBalance,
)
route.post(
  '/apply-promo-code',
  payment_controller_1.PaymentController.applyPromoCode,
)
exports.PaymentRoute = route
