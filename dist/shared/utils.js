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
exports.CheckUserByIdFromDB = exports.userNameGenerator = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
};
const userNameGenerator = (name) => {
    const randomNumber = generateRandomNumber();
    const userName = `${name}${randomNumber}`;
    return userName;
};
exports.userNameGenerator = userNameGenerator;
const CheckUserByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    return user;
});
exports.CheckUserByIdFromDB = CheckUserByIdFromDB;
