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
exports.PostController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const post_services_1 = require("./post.services");
const APIResponse_1 = __importDefault(require("../../../../shared/APIResponse"));
const http_status_codes_1 = require("http-status-codes");
const insertPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user;
    const result = yield post_services_1.PostService.insertPostIntoDB(user.user_id, req.body.post, req.body.avatar);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Post Create successfully',
        data: result,
    });
}));
const retrieveAllPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_services_1.PostService.retrieveAllPostFromDB();
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Post retrieve successfully',
        data: result,
    });
}));
const myAllPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user;
    const result = yield post_services_1.PostService.myAllPostFromDB(user.user_id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Retrieve My All Post successfully',
        data: result,
    });
}));
const getPostById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_services_1.PostService.getPostByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Post Retrieve successfully',
        data: result,
    });
}));
const updatePostById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_services_1.PostService.updatePostByIdIntoDB(req.body.post, req.body.avatar);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Post Update successfully',
        data: result,
    });
}));
const deletePostById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_services_1.PostService.deletePostByIdFromDB(req.params.id);
    (0, APIResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Post Delete successfully',
        data: result,
    });
}));
exports.PostController = {
    insertPost,
    myAllPost,
    deletePostById,
    updatePostById,
    getPostById,
    retrieveAllPost,
};
