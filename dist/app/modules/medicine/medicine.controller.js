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
exports.MedicineController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const APIResponse_1 = __importDefault(require("../../../shared/APIResponse"));
const http_status_codes_1 = require("http-status-codes");
const medicine_services_1 = require("./medicine.services");
const insetIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_services_1.MedicineServices.insetIntoDB(req.body);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Medicine Added Successfully',
        data: result,
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_services_1.MedicineServices.getByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Medicine fetched Successfully',
        data: result,
    });
}));
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_services_1.MedicineServices.deleteByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Medicine deleted Successfully',
        data: result,
    });
}));
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_services_1.MedicineServices.updateByIdIntoDB(req.params.id, req.body);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Medicine updated Successfully',
        data: result,
    });
}));
exports.MedicineController = {
    insetIntoDB,
    getByIdFromDB,
    deleteByIdFromDB,
    updateByIdIntoDB,
};
