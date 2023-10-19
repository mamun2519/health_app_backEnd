import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { ServiceReviewController } from './serviceReview.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { ServiceReviewValidation } from './serviceReview.validaion'
const route = express.Router()
route.post(
  '/',
  auth(USER_ROLE.USER),
  ValidationRequest(ServiceReviewValidation.create),
  ServiceReviewController.insetIntoDB,
)
route.get('/', auth(USER_ROLE.USER), ServiceReviewController.myReview)
route.get('/all-review', ServiceReviewController.getAllReviewFromDb)
route.get('/:id', ServiceReviewController.getByIdFromDB)
route.patch(
  '/:id',
  ValidationRequest(ServiceReviewValidation.create),
  ServiceReviewController.updateByIdIntoDB,
)
route.delete('/:id', ServiceReviewController.deleteByIdFromDB)
route.get('/service/:id', ServiceReviewController.getServiceWithReview)
export const ServiceReviewRoutes = route
