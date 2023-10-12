import express from 'express'
import { DonorReviewController } from './donnerReview.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import ValidationRequest from '../../middleware/validationRequest'
import { DonorReviewValidation } from './donorReview.validation'
const router = express.Router()
router.post(
  '/',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  ValidationRequest(DonorReviewValidation.create),
  DonorReviewController.createDonorReviewIntoDB,
)
router.get('/:id', DonorReviewController.getByIdFromDB)
router.patch(
  '/:id',
  auth(USER_ROLE.USER),
  ValidationRequest(DonorReviewValidation.create),
  DonorReviewController.updateByIdIntoDB,
)
router.delete(
  '/:id',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  DonorReviewController.deleteByIdFromDB,
)

export const DonorReviewRoutes = router
