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
exports.ActivityController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const APIResponse_1 = __importDefault(require("../../../shared/APIResponse"));
const http_status_codes_1 = require("http-status-codes");
const activity_services_1 = require("./activity.services");
const userActivity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield activity_services_1.ActivityService.userActivity(user.user_id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User Activity  successfully',
        data: result,
    });
}));
const donorActivity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield activity_services_1.ActivityService.donorActivity(user.user_id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Donor Activity  successfully',
        data: result,
    });
}));
const doctorActivity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield activity_services_1.ActivityService.doctorActivity(user.user_id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Doctor Activity  successfully',
        data: result,
    });
}));
const adminActivity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield activity_services_1.ActivityService.adminActivity(user.user_id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Admin Activity  successfully',
        data: result,
    });
}));
exports.ActivityController = {
    userActivity,
    donorActivity,
    doctorActivity,
    adminActivity,
};
