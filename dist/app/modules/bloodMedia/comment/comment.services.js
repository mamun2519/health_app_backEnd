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
exports.CommentService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma/prisma"));
const utils_1 = require("../../../../shared/utils");
const http_status_codes_1 = require("http-status-codes");
const apiError_1 = __importDefault(require("../../../../error/apiError"));
const insertCommentIntoDB = (userId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.CheckUserByIdFromDB)(userId);
    if (!user) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User Not Found');
    }
    comment.userId = userId;
    return yield prisma_1.default.postComment.create({ data: comment });
});
const updateCommentIntoDB = (commentId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.postComment.update({
        where: { id: commentId },
        data: comment,
    });
});
const deleteCommentByIdFromDB = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.postComment.delete({
        where: {
            id: commentId,
        },
    });
});
const getCommentByIdFromDB = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.postComment.findFirst({
        where: {
            id: commentId,
        },
    });
});
const myAllCommentFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.postComment.findMany({
        where: {
            userId,
        },
    });
});
//Reply Comment Services
const insertReplyCommentIntoDB = (userId, replyComment) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.CheckUserByIdFromDB)(userId);
    if (!user) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User Not Found');
    }
    replyComment.userId = userId;
    return yield prisma_1.default.replyComment.create({ data: replyComment });
});
const updateReplyCommentIntoDB = (replyCommentId, replyComment) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.replyComment.update({
        where: { id: replyCommentId },
        data: replyComment,
    });
});
const deleteReplyCommentByIdFromDB = (replyCommentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.replyComment.delete({
        where: {
            id: replyCommentId,
        },
    });
});
const getReplyCommentByIdFromDB = (replyCommentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.replyComment.findFirst({
        where: {
            id: replyCommentId,
        },
    });
});
const myAllReplyCommentFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.replyComment.findMany({
        where: {
            userId,
        },
    });
});
exports.CommentService = {
    insertCommentIntoDB,
    updateCommentIntoDB,
    deleteCommentByIdFromDB,
    getCommentByIdFromDB,
    myAllCommentFromDB,
    insertReplyCommentIntoDB,
    updateReplyCommentIntoDB,
    deleteReplyCommentByIdFromDB,
    getReplyCommentByIdFromDB,
    myAllReplyCommentFromDB,
};
