import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { DoctorController } from './doctor.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { DoctorServiceValidation } from './doctor.validation'
const router = express.Router()
router.get(
  '/my-prescription',
  auth(USER_ROLE.DOCTOR),
  DoctorController.myPrescription,
)
router.get(
  '/my-all-meet',
  auth(USER_ROLE.DOCTOR),
  DoctorController.myGoogleMeet,
)
router.get(
  '/filter-services',

  DoctorController.getFilterServiceFromDB,
)
router.get(
  '/all-doctor',

  DoctorController.allDoctorFromDB,
)
router.post(
  '/',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(DoctorServiceValidation.create),
  DoctorController.createServiceIntoDB,
)
router.get(
  '/my-complete-meet',
  auth(USER_ROLE.DOCTOR),
  DoctorController.myCompletedGoogleMeetService,
)
router.get(
  '/my-service',
  auth(USER_ROLE.DOCTOR),
  DoctorController.myServiceFromDB,
)
router.get(
  '/my-booking-appointment',
  auth(USER_ROLE.DOCTOR),
  DoctorController.myBookingAppointment,
)
router.get(
  '/my-active-meet',
  auth(USER_ROLE.DOCTOR),
  DoctorController.myActiveGoogleMeetService,
)

router.get(
  '/my-payment',
  auth(USER_ROLE.DOCTOR),
  DoctorController.myPaymentList,
)
router.get(
  '/my-withdraw',
  auth(USER_ROLE.DOCTOR),
  DoctorController.myWithdrawList,
)

router.get('/:id', DoctorController.getByIdFromDB)
router.patch(
  '/:id',
  // ValidationRequest(DoctorServiceValidation.update),
  DoctorController.updateByIdIntoDB,
)
router.delete('/:id', DoctorController.deleteByIdFromDB)
router.get('/', DoctorController.getAllFromDB)

export const DoctorServiceRoutes = router
