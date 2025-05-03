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
exports.GoogleMeetController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const APIResponse_1 = __importDefault(require("../../../shared/APIResponse"));
const http_status_codes_1 = require("http-status-codes");
const googleMeet_services_1 = require("./googleMeet.services");
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constant/pagination");
const insetIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield googleMeet_services_1.GoogleMeetService.insetIntoDB(user.user_id, req.body);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Google Meet created Successfully',
        data: result,
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield googleMeet_services_1.GoogleMeetService.getByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Google Meet fetched Successfully',
        data: result,
    });
}));
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield googleMeet_services_1.GoogleMeetService.updateByIdIntoDB(req.params.id, req.body);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Google Meet updated Successfully',
        data: result,
    });
}));
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield googleMeet_services_1.GoogleMeetService.deleteByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Google Meet deleted Successfully',
        data: result,
    });
}));
const updateStatusAndDeleteGoogleMeet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield googleMeet_services_1.GoogleMeetService.updateStatusAndDeleteGoogleMeet(req.params.id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Google Meet updated Successfully',
        data: result,
    });
}));
const getAllActiveMeetFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.receiveArrayAndReturnObject)(req.query, pagination_1.paginationFiled);
    const result = yield googleMeet_services_1.GoogleMeetService.getAllActiveMeetFromDB(options);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Google Meet Active fetched Successfully',
        data: result,
    });
}));
exports.GoogleMeetController = {
    insetIntoDB,
    getByIdFromDB,
    updateByIdIntoDB,
    deleteByIdFromDB,
    updateStatusAndDeleteGoogleMeet,
    getAllActiveMeetFromDB,
};
