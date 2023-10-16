import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { PaymentController } from './payment.controller'
const route = express.Router()
route.delete(
  '/:id',

  auth(USER_ROLE.BLOODDONOR, USER_ROLE.USER, USER_ROLE.ADMIN),
  PaymentController.deleteByIdFromDB,
)
route.post(
  '/',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  PaymentController.createPayment,
)
route.post(
  '/booking',
  auth(USER_ROLE.USER, USER_ROLE.BLOODDONOR),
  PaymentController.OrderAppointment,
)
route.get('/:id', PaymentController.getByIdFromDB)
route.get('/', PaymentController.getAllFromDB)
route.patch(
  '/:id',
  auth(USER_ROLE.USER, USER_ROLE.DOCTOR),
  PaymentController.updateByIdIntoDB,
)
route.post('/create-balance', PaymentController.createCompanyBalance)

export const PaymentRoute = route
