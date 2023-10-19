"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_1 = require("../../../enum/user");
const prescription_controller_1 = require("./prescription.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), prescription_controller_1.PrescriptionController.insetIntoDB);
router.get('/:id', prescription_controller_1.PrescriptionController.getByIdFromDB);
router.patch('/:id', prescription_controller_1.PrescriptionController.updateByIdIntoDB);
router.delete('/:id', prescription_controller_1.PrescriptionController.deleteByIdFromDB);
router.get('/doctor-assign', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), prescription_controller_1.PrescriptionController.doctorAssignPrescription);
router.get('/', prescription_controller_1.PrescriptionController.getAllFromDB);
exports.PrescriptionRoutes = router;
