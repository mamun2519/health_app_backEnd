import express from 'express'
import { UserController } from './user.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
const router = express.Router()
router.get(
  '/filterDoctor',

  UserController.filtersDoctorFromDB,
)
router.post(
  '/request-donor',
  auth(USER_ROLE.USER),
  UserController.bloodDonorRequest,
)
router.get(
  '/my-donor-request',
  auth(USER_ROLE.USER),
  UserController.myDonorRequest,
)
router.get(
  '/my-donor-review',
  auth(USER_ROLE.USER),
  UserController.myDonorReviewFromDB,
)
router.get(
  '/my-appointment',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  UserController.myAppointment,
)
router.get(
  '/my-prescription',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  UserController.myPrescription,
)
router.get(
  '/my-profile',
  auth(
    USER_ROLE.USER,
    USER_ROLE.ADMIN,
    USER_ROLE.BLOODDONOR,
    USER_ROLE.MANAGER,
  ),
  UserController.userProfile,
)
router.get(
  '/my-payment',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  UserController.myPaymentList,
)
router.get('/', UserController.getAllUser)
router.get('/:id', UserController.getByIdFromDB)
router.patch('/:id', UserController.updateByIdIntoDB)

export const UserRoutes = router
