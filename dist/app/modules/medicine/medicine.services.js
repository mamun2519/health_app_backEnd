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
exports.MedicineServices = void 0;
const prisma_1 = __importDefault(require("../../../prisma/prisma"));
const insetIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.medicine.create({ data });
    return result;
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicine.findFirst({ where: { id } });
});
const updateByIdIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicine.update({ where: { id }, data });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicine.delete({ where: { id } });
});
exports.MedicineServices = {
    insetIntoDB,
    getByIdFromDB,
    deleteByIdFromDB,
    updateByIdIntoDB,
};
