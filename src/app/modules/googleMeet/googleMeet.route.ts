import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { GoogleMeetController } from './googleMeet.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { GoogleMeetValidation } from './googleMeet.validation'
const route = express.Router()

route.post(
  '/',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(GoogleMeetValidation.create),

  GoogleMeetController.insetIntoDB,
)
route.get('/active', GoogleMeetController.getAllActiveMeetFromDB)
route.get('/:id', GoogleMeetController.getByIdFromDB)
route.patch(
  '/:id',
  auth(USER_ROLE.DOCTOR),
  GoogleMeetController.updateByIdIntoDB,
)
route.delete(
  '/:id',
  auth(USER_ROLE.DOCTOR),
  GoogleMeetController.deleteByIdFromDB,
)
route.patch(
  '/update-status/:id',

  auth(USER_ROLE.DOCTOR),
  ValidationRequest(GoogleMeetValidation.update),
  GoogleMeetController.updateStatusAndDeleteGoogleMeet,
)

export const GoogleMeetRoutes = route
