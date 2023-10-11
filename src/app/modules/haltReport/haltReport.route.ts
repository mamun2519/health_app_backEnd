import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { HaltReportController } from './haltReport.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { HaltReportValidation } from './haltReport.validation'

const route = express.Router()
route.post(
  '/',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(HaltReportValidation.create),
  HaltReportController.insetIntoDB,
)
route.get('/:id', HaltReportController.getByIdFromDB)
route.patch(
  '/:id',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(HaltReportValidation.update),
  HaltReportController.updateByIdIntoDB,
)
route.delete(
  '/:id',
  auth(USER_ROLE.DOCTOR),
  HaltReportController.deleteByIdFromDB,
)

export const HaltReportRoutes = route
