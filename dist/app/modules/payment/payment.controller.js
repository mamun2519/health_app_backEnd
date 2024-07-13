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
exports.PaymentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const payment_services_1 = require("./payment.services");
const APIResponse_1 = __importDefault(require("../../../shared/APIResponse"));
const http_status_codes_1 = require("http-status-codes");
const pick_1 = require("../../../shared/pick");
const payment_constant_1 = require("./payment.constant");
const pagination_1 = require("../../../constant/pagination");
const createPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield payment_services_1.PaymentService.createPayment(user.user_id, req.body);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Payment Successfully',
        data: result,
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.receiveArrayAndReturnObject)(req.query, payment_constant_1.PaymentFilterAbleFiled);
    const options = (0, pick_1.receiveArrayAndReturnObject)(req.query, pagination_1.paginationFiled);
    const result = yield payment_services_1.PaymentService.getAllFromDB(filter, options);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Payment fetched Successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_services_1.PaymentService.getByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Payment fetched Successfully',
        data: result,
    });
}));
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_services_1.PaymentService.deleteByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Payment delete Successfully',
        data: result,
    });
}));
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_services_1.PaymentService.updateByIdIntoDB(req.params.id, req.body);
    (0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Payment update Successfully',
        data: result,
    });
}));
const createCompanyBalance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_services_1.PaymentService.createCompanyBalance(req.body);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'company initial balance created Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const OrderAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield payment_services_1.PaymentService.OrderAppointment(req.body.appointment, req.body.payment, user === null || user === void 0 ? void 0 : user.user_id);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Payment Was Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const paymentByStripe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_services_1.PaymentService.paymentByStripe(Number(req.params.price));
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Payment Link Send Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const applyPromoCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_services_1.PaymentService.applyPromoCode(req.body);
    (0, APIResponse_1.default)(res, {
        success: true,
        message: 'Promo Code offer Successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.PaymentController = {
    createPayment,
    applyPromoCode,
    getAllFromDB,
    getByIdFromDB,
    updateByIdIntoDB,
    deleteByIdFromDB,
    OrderAppointment,
    createCompanyBalance,
    paymentByStripe,
};
