"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_1 = require("../../../enum/user");
const doctor_controller_1 = require("./doctor.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const doctor_validation_1 = require("./doctor.validation");
const router = express_1.default.Router();
router.get('/active-meet/:id', doctor_controller_1.DoctorController.activeMeet);
router.get('/my-payment', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), doctor_controller_1.DoctorController.myPaymentList);
router.get('/my-prescription', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), doctor_controller_1.DoctorController.myPrescription);
router.get('/my-all-meet', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), doctor_controller_1.DoctorController.myGoogleMeet);
router.get('/filter-services', doctor_controller_1.DoctorController.getFilterServiceFromDB);
router.get('/all-doctor', doctor_controller_1.DoctorController.allDoctorFromDB);
router.post('/', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), (0, validationRequest_1.default)(doctor_validation_1.DoctorServiceValidation.create), doctor_controller_1.DoctorController.createServiceIntoDB);
router.get('/my-complete-meet', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), doctor_controller_1.DoctorController.myCompletedGoogleMeetService);
router.get('/my-service', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), doctor_controller_1.DoctorController.myServiceFromDB);
router.get('/my-booking-appointment', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), doctor_controller_1.DoctorController.myBookingAppointment);
router.get('/my-active-meet', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), doctor_controller_1.DoctorController.myActiveGoogleMeetService);
router.get('/my-withdraw', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), doctor_controller_1.DoctorController.myWithdrawList);
router.get('/:id', doctor_controller_1.DoctorController.getByIdFromDB);
router.patch('/:id', 
// ValidationRequest(DoctorServiceValidation.update),
doctor_controller_1.DoctorController.updateByIdIntoDB);
router.delete('/:id', doctor_controller_1.DoctorController.deleteByIdFromDB);
router.get('/', doctor_controller_1.DoctorController.getAllFromDB);
exports.DoctorServiceRoutes = router;
