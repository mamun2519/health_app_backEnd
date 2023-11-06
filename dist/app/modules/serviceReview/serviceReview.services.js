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
exports.ServiceReviewServices = void 0;
const prisma_1 = __importDefault(require("../../../prisma/prisma"));
const apiError_1 = __importDefault(require("../../../error/apiError"));
const http_status_codes_1 = require("http-status-codes");
const insetIntoDB = (authUserId, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const user = yield prisma_1.default.user.findFirst({
        where: { id: authUserId },
        include: { profile: true },
    });
    const service = yield prisma_1.default.doctorService.findFirst({
        where: {
            id: data === null || data === void 0 ? void 0 : data.serviceId,
        },
        include: {
            doctor: true,
        },
    });
    if (!user) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User Not Found');
    }
    if (!service) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service Not Found');
    }
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        data.userId = authUserId;
        const review = yield transactionClient.serviceReview.create({
            data,
        });
        const message = `${(_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.user_name} review your Service`;
        yield transactionClient.notification.create({
            data: {
                userId: (_b = service === null || service === void 0 ? void 0 : service.doctor) === null || _b === void 0 ? void 0 : _b.user_id,
                message,
            },
        });
        return review;
    }));
    return result;
});
const myReview = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceReview.findMany({
        where: {
            userId: authUserId,
        },
    });
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceReview.findFirst({ where: { id } });
});
const updateByIdIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceReview.update({ where: { id }, data });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceReview.delete({ where: { id } });
});
const getServiceWithReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('id-', id);
    const result = yield prisma_1.default.serviceReview.findMany({
        where: { serviceId: id },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    });
    return result;
});
const getAllReviewFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceReview.findMany({
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    });
    return result;
});
exports.ServiceReviewServices = {
    getServiceWithReview,
    insetIntoDB,
    myReview,
    getByIdFromDB,
    deleteByIdFromDB,
    updateByIdIntoDB,
    getAllReviewFromDb,
};
