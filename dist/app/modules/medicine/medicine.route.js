"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_1 = require("../../../enum/user");
const medicine_controller_1 = require("./medicine.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const medicine_validation_1 = require("./medicine.validation");
const route = express_1.default.Router();
route.post('/', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), (0, validationRequest_1.default)(medicine_validation_1.MedicineValidation.create), medicine_controller_1.MedicineController.insetIntoDB);
route.get('/:id', medicine_controller_1.MedicineController.getByIdFromDB);
route.patch('/:id', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), (0, validationRequest_1.default)(medicine_validation_1.MedicineValidation.create), medicine_controller_1.MedicineController.updateByIdIntoDB);
route.delete('/:id', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), medicine_controller_1.MedicineController.deleteByIdFromDB);
exports.MedicineRoutes = route;
