"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaltReportRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_1 = require("../../../enum/user");
const haltReport_controller_1 = require("./haltReport.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const haltReport_validation_1 = require("./haltReport.validation");
const route = express_1.default.Router();
route.post('/', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), (0, validationRequest_1.default)(haltReport_validation_1.HaltReportValidation.create), haltReport_controller_1.HaltReportController.insetIntoDB);
route.get('/:id', haltReport_controller_1.HaltReportController.getByIdFromDB);
route.patch('/:id', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), (0, validationRequest_1.default)(haltReport_validation_1.HaltReportValidation.update), haltReport_controller_1.HaltReportController.updateByIdIntoDB);
route.delete('/:id', (0, auth_1.auth)(user_1.USER_ROLE.DOCTOR), haltReport_controller_1.HaltReportController.deleteByIdFromDB);
exports.HaltReportRoutes = route;
