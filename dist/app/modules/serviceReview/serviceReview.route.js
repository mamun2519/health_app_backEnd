'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ServiceReviewRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const serviceReview_controller_1 = require('./serviceReview.controller')
const validationRequest_1 = __importDefault(
  require('../../middleware/validationRequest'),
)
const serviceReview_validaion_1 = require('./serviceReview.validaion')
const route = express_1.default.Router()
route.post(
  '/',
  (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.BLOODDONOR),
  (0, validationRequest_1.default)(
    serviceReview_validaion_1.ServiceReviewValidation.create,
  ),
  serviceReview_controller_1.ServiceReviewController.insetIntoDB,
)
route.get(
  '/',
  (0, auth_1.auth)(user_1.USER_ROLE.USER),
  serviceReview_controller_1.ServiceReviewController.myReview,
)
route.get(
  '/all-review',
  serviceReview_controller_1.ServiceReviewController.getAllReviewFromDb,
)
route.get(
  '/:id',
  serviceReview_controller_1.ServiceReviewController.getByIdFromDB,
)
route.patch(
  '/:id',
  (0, validationRequest_1.default)(
    serviceReview_validaion_1.ServiceReviewValidation.create,
  ),
  serviceReview_controller_1.ServiceReviewController.updateByIdIntoDB,
)
route.delete(
  '/:id',
  serviceReview_controller_1.ServiceReviewController.deleteByIdFromDB,
)
route.get(
  '/service/:id',
  serviceReview_controller_1.ServiceReviewController.getServiceWithReview,
)
exports.ServiceReviewRoutes = route