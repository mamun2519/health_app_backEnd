import express from 'express'
import { BloodDonorController } from './bloodDonor.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
const router = express.Router()
router.get('/all-donor', BloodDonorController.getAllFromDB)
router.get('/all-request', BloodDonorController.AllDonorRequest)
router.get(
  '/user-request',
  auth(USER_ROLE.BLOODDONOR),
  BloodDonorController.userDonorRequest,
)
router.get(
  '/request/details/:id',
  BloodDonorController.getByIdDonorRequestFromDB,
)
router.get('/:id', BloodDonorController.getByIdFromDB)

router.get('/', BloodDonorController.filtersBloodDonorFromDB)
router.patch(
  '/request',
  auth(USER_ROLE.BLOODDONOR, USER_ROLE.USER),
  BloodDonorController.updateDonorRequestStatusByIdFromDB,
)
router.patch(
  '/update-request/:id',
  auth(
    USER_ROLE.BLOODDONOR,
    USER_ROLE.USER,
    USER_ROLE.ADMIN,
    USER_ROLE.SUPER_ADMIN,
  ),
  BloodDonorController.donorRequestUpdateByIdIntoDB,
)
router.delete(
  '/request/:id',
  auth(
    USER_ROLE.BLOODDONOR,
    USER_ROLE.USER,
    USER_ROLE.ADMIN,
    USER_ROLE.SUPER_ADMIN,
  ),
  BloodDonorController.deleteDonorRequestByIdFromDB,
)
export const BloodDonorRoutes = router
