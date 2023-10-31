'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.DonorReviewRoutes = void 0
const express_1 = __importDefault(require('express'))
const donnerReview_controller_1 = require('./donnerReview.controller')
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const validationRequest_1 = __importDefault(
  require('../../middleware/validationRequest'),
)
const donorReview_validation_1 = require('./donorReview.validation')
const router = express_1.default.Router()
router.post(
  '/',
  (0, auth_1.auth)(
    user_1.USER_ROLE.USER,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.DOCTOR,
  ),
  (0, validationRequest_1.default)(
    donorReview_validation_1.DonorReviewValidation.create,
  ),
  donnerReview_controller_1.DonorReviewController.createDonorReviewIntoDB,
)
router.get(
  '/specific/:id',
  donnerReview_controller_1.DonorReviewController.getSpecificReview,
)
router.get(
  '/:id',
  donnerReview_controller_1.DonorReviewController.getByIdFromDB,
)
router.patch(
  '/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.USER),
  (0, validationRequest_1.default)(
    donorReview_validation_1.DonorReviewValidation.create,
  ),
  donnerReview_controller_1.DonorReviewController.updateByIdIntoDB,
)
router.delete(
  '/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.BLOODDONOR),
  donnerReview_controller_1.DonorReviewController.deleteByIdFromDB,
)
exports.DonorReviewRoutes = router
