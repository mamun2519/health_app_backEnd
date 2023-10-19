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
exports.DonorReviewService = void 0;
const prisma_1 = __importDefault(require("../../../prisma/prisma"));
const apiError_1 = __importDefault(require("../../../error/apiError"));
const http_status_codes_1 = require("http-status-codes");
const createDonorReviewIntoDB = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.userId = authUserId;
    const user = yield prisma_1.default.profile.findFirst({
        where: {
            user_id: authUserId,
        },
    });
    console.log(payload);
    if (!user) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const donorReview = yield transactionClient.donorReview.create({
            data: payload,
        });
        const message = `${user.user_name} review your profile`;
        yield transactionClient.notification.create({
            data: {
                userId: payload.userId,
                message,
            },
        });
        return donorReview;
    }));
    return result;
});
const updateByIdIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.donorReview.update({
        where: { id },
        data: payload,
    });
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.donorReview.findUnique({
        where: { id },
    });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.donorReview.delete({ where: { id } });
});
exports.DonorReviewService = {
    createDonorReviewIntoDB,
    updateByIdIntoDB,
    deleteByIdFromDB,
    getByIdFromDB,
};
