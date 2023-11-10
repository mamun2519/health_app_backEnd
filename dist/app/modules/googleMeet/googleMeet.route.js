'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.GoogleMeetRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const googleMeet_controller_1 = require('./googleMeet.controller')
const validationRequest_1 = __importDefault(
  require('../../middleware/validationRequest'),
)
const googleMeet_validation_1 = require('./googleMeet.validation')
const route = express_1.default.Router()
route.post(
  '/',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  (0, validationRequest_1.default)(
    googleMeet_validation_1.GoogleMeetValidation.create,
  ),
  googleMeet_controller_1.GoogleMeetController.insetIntoDB,
)
route.get(
  '/active',
  googleMeet_controller_1.GoogleMeetController.getAllActiveMeetFromDB,
)
route.get('/:id', googleMeet_controller_1.GoogleMeetController.getByIdFromDB)
route.patch(
  '/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  googleMeet_controller_1.GoogleMeetController.updateByIdIntoDB,
)
route.delete(
  '/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  googleMeet_controller_1.GoogleMeetController.deleteByIdFromDB,
)
route.patch(
  '/update-status/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  (0, validationRequest_1.default)(
    googleMeet_validation_1.GoogleMeetValidation.update,
  ),
  googleMeet_controller_1.GoogleMeetController.updateStatusAndDeleteGoogleMeet,
)
exports.GoogleMeetRoutes = route
