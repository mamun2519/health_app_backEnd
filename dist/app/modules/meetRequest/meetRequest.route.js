'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.MeetingRequestRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const meetRequest_controller_1 = require('./meetRequest.controller')
const validationRequest_1 = __importDefault(
  require('../../middleware/validationRequest'),
)
const meetRequest_validation_1 = require('./meetRequest.validation')
const router = express_1.default.Router()
router.post(
  '/',
  (0, auth_1.auth)(
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.DOCTOR,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.SUPER_ADMIN,
  ),
  (0, validationRequest_1.default)(
    meetRequest_validation_1.MeetRequestValidation.create,
  ),
  meetRequest_controller_1.MeetingRequestController.createMeetingRequestIntoDB,
)
router.get(
  '/doctor-meet',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  meetRequest_controller_1.MeetingRequestController.doctorMeetingRequest,
)
router.get(
  '/:id',
  meetRequest_controller_1.MeetingRequestController.getByIdFromDB,
)
router.patch(
  '/:id',
  // ValidationRequest(MeetRequestValidation.update),
  meetRequest_controller_1.MeetingRequestController.updateByIdIntoDB,
)
router.delete(
  '/:id',
  meetRequest_controller_1.MeetingRequestController.deleteByIdFromDB,
)
exports.MeetingRequestRoutes = router
