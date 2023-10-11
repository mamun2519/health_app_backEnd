import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { AppointmentController } from './appointment.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { AppointmentValidation } from './appointment.validiton'
const router = express.Router()
router.get('/:id', AppointmentController.getByIdFromDB)
router.patch(
  '/:id',
  ValidationRequest(AppointmentValidation.update),
  AppointmentController.updateByIdIntoDB,
)
router.delete('/:id', AppointmentController.deleteByIdFromDB)
router.post(
  '/',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  ValidationRequest(AppointmentValidation.create),
  AppointmentController.insetIntoDB,
)
router.get('/', AppointmentController.getAllFromDB)

export const AppointmentRoutes = router
