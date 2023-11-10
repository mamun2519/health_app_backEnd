'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.OfferServiceRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_1 = require('../../middleware/auth')
const user_1 = require('../../../enum/user')
const serviceOffer_controller_1 = require('./serviceOffer.controller')
const validationRequest_1 = __importDefault(
  require('../../middleware/validationRequest'),
)
const serviceOffer_validation_1 = require('./serviceOffer.validation')
const router = express_1.default.Router()
router.post(
  '/addToCarts',
  (0, auth_1.auth)(
    user_1.USER_ROLE.DOCTOR,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
  ),
  serviceOffer_controller_1.OfferServiceController.addToCart,
)
router.post(
  '/',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  (0, validationRequest_1.default)(
    serviceOffer_validation_1.ServiceOfferValidation.create,
  ),
  serviceOffer_controller_1.OfferServiceController.insetIntoDB,
)
router.get(
  '/myCart',
  (0, auth_1.auth)(
    user_1.USER_ROLE.DOCTOR,
    user_1.USER_ROLE.ADMIN,
    user_1.USER_ROLE.BLOODDONOR,
    user_1.USER_ROLE.USER,
  ),
  serviceOffer_controller_1.OfferServiceController.MyCart,
)
router.get(
  '/doctor-offer',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  serviceOffer_controller_1.OfferServiceController.doctorOfferService,
)
router.get(
  '/',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  serviceOffer_controller_1.OfferServiceController.getAllFromDB,
)
router.get(
  '/:id',
  serviceOffer_controller_1.OfferServiceController.getByIdFromDB,
)
router.patch(
  '/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  (0, validationRequest_1.default)(
    serviceOffer_validation_1.ServiceOfferValidation.update,
  ),
  serviceOffer_controller_1.OfferServiceController.updateByIdIntoDB,
)
router.delete(
  '/:id',
  (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR),
  serviceOffer_controller_1.OfferServiceController.deleteByIdFromDB,
)
router.delete(
  '/cart/:id',
  serviceOffer_controller_1.OfferServiceController.singleCartDelete,
)
exports.OfferServiceRoutes = router
