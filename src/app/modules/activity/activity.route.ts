import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { ActivityController } from './activity.controller'

const router = express.Router()
router.get('/user', auth(USER_ROLE.USER), ActivityController.userActivity)
router.get(
  '/donor',
  auth(USER_ROLE.BLOODDONOR),
  ActivityController.donorActivity,
)

export const ActivityRoutes = router
