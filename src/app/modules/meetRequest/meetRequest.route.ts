import express from 'express'

import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { MeetingRequestController } from './meetRequest.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { MeetRequestValidation } from './meetRequest.validation'
const router = express.Router()
router.post(
  '/',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  ValidationRequest(MeetRequestValidation.create),
  MeetingRequestController.createMeetingRequestIntoDB,
)
router.get(
  '/doctor-meet',
  auth(USER_ROLE.DOCTOR),
  MeetingRequestController.doctorMeetingRequest,
)
router.get('/:id', MeetingRequestController.getByIdFromDB)
router.patch(
  '/:id',
  // ValidationRequest(MeetRequestValidation.update),
  MeetingRequestController.updateByIdIntoDB,
)
router.delete(
  '/:id',

  MeetingRequestController.deleteByIdFromDB,
)

export const MeetingRequestRoutes = router
