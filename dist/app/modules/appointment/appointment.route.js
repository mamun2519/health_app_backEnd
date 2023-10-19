"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_1 = require("../../../enum/user");
const appointment_controller_1 = require("./appointment.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const appointment_validiton_1 = require("./appointment.validiton");
const router = express_1.default.Router();
router.get('/:id', appointment_controller_1.AppointmentController.getByIdFromDB);
router.patch('/:id', (0, validationRequest_1.default)(appointment_validiton_1.AppointmentValidation.update), appointment_controller_1.AppointmentController.updateByIdIntoDB);
router.delete('/:id', appointment_controller_1.AppointmentController.deleteByIdFromDB);
router.post('/', (0, auth_1.auth)(user_1.USER_ROLE.USER, user_1.USER_ROLE.BLOODDONOR), (0, validationRequest_1.default)(appointment_validiton_1.AppointmentValidation.create), appointment_controller_1.AppointmentController.insetIntoDB);
router.get('/', appointment_controller_1.AppointmentController.getAllFromDB);
exports.AppointmentRoutes = router;
