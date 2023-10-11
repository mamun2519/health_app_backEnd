import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { MedicineController } from './medicine.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { MedicineValidation } from './medicine.validation'

const route = express.Router()
route.post(
  '/',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(MedicineValidation.create),

  MedicineController.insetIntoDB,
)
route.get('/:id', MedicineController.getByIdFromDB)
route.patch(
  '/:id',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(MedicineValidation.create),
  MedicineController.updateByIdIntoDB,
)
route.delete(
  '/:id',
  auth(USER_ROLE.DOCTOR),
  MedicineController.deleteByIdFromDB,
)

export const MedicineRoutes = route
