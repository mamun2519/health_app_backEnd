import express from 'express'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/user'
import { PrescriptionController } from './prescription.controller'

const router = express.Router()
router.post('/', auth(USER_ROLE.DOCTOR), PrescriptionController.insetIntoDB)
router.get('/:id', PrescriptionController.getByIdFromDB)
router.patch('/:id', PrescriptionController.updateByIdIntoDB)
router.delete('/:id', PrescriptionController.deleteByIdFromDB)
router.get(
  '/doctor-assign',
  auth(USER_ROLE.DOCTOR),
  PrescriptionController.doctorAssignPrescription,
)
router.get('/', PrescriptionController.getAllFromDB)

export const PrescriptionRoutes = router
