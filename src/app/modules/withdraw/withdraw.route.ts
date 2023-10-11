import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { WithdrawController } from './withdraw.controller'
import ValidationRequest from '../../middleware/validationRequest'
import { withdrawValidation } from './withdraw.validaiton'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.DOCTOR),
  ValidationRequest(withdrawValidation.create),
  WithdrawController.doctorWithDrawRequest,
)

router.post(
  '/accepted/:id',
  auth(USER_ROLE.DOCTOR, USER_ROLE.USER),
  WithdrawController.withdrawAccepted,
)
router.get(
  '/:id',

  WithdrawController.getByIdFromDB,
)
router.patch(
  '/:id',
  ValidationRequest(withdrawValidation.create),
  WithdrawController.updateByIdIntoDB,
)
router.delete('/:id', WithdrawController.deleteByIdFromDB)
router.get(
  '/',

  WithdrawController.getAllFromDB,
)

export const WithdrawRoutes = router
