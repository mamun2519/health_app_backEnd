import express from 'express'
import { NotificationController } from './controller'

const router = express.Router()
router.delete(
  '/:id',

  NotificationController.deleteByIdFromDB,
)

export const NotificationRoutes = router
