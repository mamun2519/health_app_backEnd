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
exports.PrescriptionController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const APIResponse_1 = __importDefault(require("../../../shared/APIResponse"));
const http_status_codes_1 = require("http-status-codes");
const prescription_services_1 = require("./prescription.services");
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constant/pagination");
const serviceOffer_constant_1 = require("../serviceOffer/serviceOffer.constant");
const insetIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield prescription_services_1.PrescriptionService.insetIntoDB(req.body, user.user_id);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Prescription booking Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const doctorAssignPrescription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const options = (0, pick_1.receiveArrayAndReturnObject)(req.query, pagination_1.paginationFiled);
    const result = yield prescription_services_1.PrescriptionService.doctorAssignPrescription(user.user_id, options);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Prescription booking Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.receiveArrayAndReturnObject)(req.query, serviceOffer_constant_1.PrescriptionFilterAbleFiled);
    const options = (0, pick_1.receiveArrayAndReturnObject)(req.query, pagination_1.paginationFiled);
    const result = yield prescription_services_1.PrescriptionService.getAllFromDB(filter, options);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Prescription fetched Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_services_1.PrescriptionService.getByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Prescription fetched Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_services_1.PrescriptionService.updateByIdIntoDB(req.params.id, req.body);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Prescription updated Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_services_1.PrescriptionService.deleteByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Prescription deleted Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.PrescriptionController = {
    insetIntoDB,
    deleteByIdFromDB,
    getAllFromDB,
    getByIdFromDB,
    updateByIdIntoDB,
    doctorAssignPrescription,
};
