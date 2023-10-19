import express from 'express'
import { UserController } from './user.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
const router = express.Router()
router.patch(
  '/update',
  auth(
    USER_ROLE.USER,
    USER_ROLE.BLOODDONOR,
    USER_ROLE.DOCTOR,
    USER_ROLE.ADMIN,
    USER_ROLE.SUPER_ADMIN,
  ),
  UserController.updateUserProfile,
)
router.get(
  '/my-notification',
  auth(
    USER_ROLE.USER,
    USER_ROLE.BLOODDONOR,
    USER_ROLE.DOCTOR,
    USER_ROLE.ADMIN,
    USER_ROLE.SUPER_ADMIN,
  ),
  UserController.myNotification,
)
router.get(
  '/filterDoctor',

  UserController.filtersDoctorFromDB,
)
router.get(
  '/all-user',

  UserController.AllUserFromDb,
)
router.get(
  '/all-admin',

  UserController.AllAdminFromDB,
)

router.post(
  '/request-donor',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  UserController.bloodDonorRequest,
)
router.get(
  '/my-donor-request',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
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
    USER_ROLE.DOCTOR,
    USER_ROLE.ADMIN,
  ),
  UserController.userProfile,
)
router.get(
  '/my-payment',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  UserController.myPaymentList,
)
router.delete('/delete-user/:id', UserController.deleteUser)
router.get('/', UserController.getAllUser)
router.get('/:id', UserController.getByIdFromDB)
router.patch(
  '/:id',
  auth(
    USER_ROLE.USER,
    USER_ROLE.BLOODDONOR,
    USER_ROLE.DOCTOR,
    USER_ROLE.ADMIN,
    USER_ROLE.SUPER_ADMIN,
  ),
  UserController.updateByIdIntoDB,
)

export const UserRoutes = router
