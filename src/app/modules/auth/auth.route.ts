import express from 'express'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post('/create-user', AuthController.createUser)
router.post('/create-donor', AuthController.createDonor)
router.post('/create-doctor', AuthController.createDoctor)
router.post('/login', AuthController.userLogin)
router.post('/forget-password', AuthController.forgetPassword)
router.post('/reset-password', AuthController.resetPassword)
router.post('/username/:id', AuthController.changeUserName)
router.post('/forget-request', AuthController.requestForgetPassword)
export const AuthRoutes = router
