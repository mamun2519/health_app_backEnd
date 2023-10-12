import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { PaymentController } from './payment.controller'
const route = express.Router()
route.delete(
  '/:id',

  auth(USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.MANAGER),
  PaymentController.deleteByIdFromDB,
)
route.post(
  '/',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  PaymentController.createPayment,
)
route.get('/:id', PaymentController.getByIdFromDB)
route.get('/', auth(USER_ROLE.MANAGER), PaymentController.getAllFromDB)
route.patch(
  '/:id',
  auth(USER_ROLE.USER, USER_ROLE.DOCTOR),
  PaymentController.updateByIdIntoDB,
)
route.post('/create-balance', PaymentController.createCompanyBalance)

export const PaymentRoute = route
