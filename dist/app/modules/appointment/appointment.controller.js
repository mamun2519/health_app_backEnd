"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const appointment_services_1 = require("./appointment.services");
const APIResponse_1 = __importDefault(require("../../../shared/APIResponse"));
const http_status_codes_1 = require("http-status-codes");
const pick_1 = require("../../../shared/pick");
const appointment_constant_1 = require("./appointment.constant");
const pagination_1 = require("../../../constant/pagination");
const insetIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield appointment_services_1.AppointmentService.insetIntoDB(req.body, user.user_id);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Appointment booking Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.receiveArrayAndReturnObject)(req.query, appointment_constant_1.AppointmentFilterAbleFiled);
    const options = (0, pick_1.receiveArrayAndReturnObject)(req.query, pagination_1.paginationFiled);
    const result = yield appointment_services_1.AppointmentService.getAllFromDB(filter, options);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Appointment fetched Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        meta: result.meta,
        data: result.data,
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_services_1.AppointmentService.getByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Appointment fetched Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_services_1.AppointmentService.updateByIdIntoDB(req.params.id, req.body);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Appointment updated Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_services_1.AppointmentService.deleteByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Appointment deleted Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.AppointmentController = {
    insetIntoDB,
    deleteByIdFromDB,
    getAllFromDB,
    getByIdFromDB,
    updateByIdIntoDB,
};
