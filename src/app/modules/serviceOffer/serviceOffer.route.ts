import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { OfferServiceController } from './serviceOffer.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { ServiceOfferValidation } from './serviceOffer.validation'
const router = express.Router()
router.post(
  '/',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(ServiceOfferValidation.create),
  OfferServiceController.insetIntoDB,
)
router.get(
  '/doctor-offer',
  auth(USER_ROLE.DOCTOR),
  OfferServiceController.doctorOfferService,
)
router.get('/', auth(USER_ROLE.DOCTOR), OfferServiceController.getAllFromDB)
router.get('/:id', OfferServiceController.getByIdFromDB)
router.patch(
  '/:id',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(ServiceOfferValidation.update),
  OfferServiceController.updateByIdIntoDB,
)
router.delete(
  '/:id',
  auth(USER_ROLE.DOCTOR),
  OfferServiceController.deleteByIdFromDB,
)

export const OfferServiceRoutes = router
