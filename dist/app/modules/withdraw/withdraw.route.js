'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.WithdrawRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const withdraw_controller_1 = require('./withdraw.controller')
const validationRequest_1 = __importDefault(
  require('../../middleware/validationRequest'),
)
const withdraw_validaiton_1 = require('./withdraw.validaiton')
const router = express_1.default.Router()
router.post(
  '/',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  (0, validationRequest_1.default)(
    withdraw_validaiton_1.withdrawValidation.create,
  ),
  withdraw_controller_1.WithdrawController.doctorWithDrawRequest,
)
router.post(
  '/accepted/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR, user_1.USER_ROLE.USER),
  withdraw_controller_1.WithdrawController.withdrawAccepted,
)
router.get('/:id', withdraw_controller_1.WithdrawController.getByIdFromDB)
router.patch(
  '/:id',
  (0, validationRequest_1.default)(
    withdraw_validaiton_1.withdrawValidation.create,
  ),
  withdraw_controller_1.WithdrawController.updateByIdIntoDB,
)
router.delete('/:id', withdraw_controller_1.WithdrawController.deleteByIdFromDB)
router.get('/', withdraw_controller_1.WithdrawController.getAllFromDB)
exports.WithdrawRoutes = router
