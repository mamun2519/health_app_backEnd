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
exports.CommentController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const comment_services_1 = require("./comment.services");
const APIResponse_1 = __importDefault(require("../../../../shared/APIResponse"));
const http_status_codes_1 = require("http-status-codes");
const insertComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user;
    const result = yield comment_services_1.CommentService.insertCommentIntoDB(user.user_id, req.body.comment);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Comment successfully',
        data: result,
    });
}));
const myAllComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user;
    const result = yield comment_services_1.CommentService.myAllCommentFromDB(user.user_id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'My All Comment Retrieve successfully',
        data: result,
    });
}));
const getCommentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_services_1.CommentService.getCommentByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Single Comment Retrieve successfully',
        data: result,
    });
}));
const updateCommentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_services_1.CommentService.updateCommentIntoDB(req.params.id, req.body);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: ' Comment Update successfully',
        data: result,
    });
}));
const deleteCommentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_services_1.CommentService.deleteCommentByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Comment Delete successfully',
        data: result,
    });
}));
// ReplyCommentController
const insertReplyComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user;
    const result = yield comment_services_1.CommentService.insertReplyCommentIntoDB(user.user_id, req.body.comment);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Reply Comment successfully',
        data: result,
    });
}));
const myAllReplyComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user;
    const result = yield comment_services_1.CommentService.myAllReplyCommentFromDB(user.user_id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'My All Reply Comment Retrieve successfully',
        data: result,
    });
}));
const getReplyCommentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_services_1.CommentService.getReplyCommentByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Reply Comment Retrieve successfully',
        data: result,
    });
}));
const updateReplyCommentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_services_1.CommentService.updateReplyCommentIntoDB(req.params.id, req.body);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Reply Comment Update successfully',
        data: result,
    });
}));
const deleteReplyCommentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_services_1.CommentService.deleteReplyCommentByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Reply Comment Delete successfully',
        data: result,
    });
}));
exports.CommentController = {
    insertComment,
    myAllComment,
    getCommentById,
    updateCommentById,
    deleteCommentById,
    insertReplyComment,
    myAllReplyComment,
    getReplyCommentById,
    updateReplyCommentById,
    deleteReplyCommentById,
};
