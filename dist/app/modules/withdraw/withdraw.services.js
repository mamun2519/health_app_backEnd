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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../prisma/prisma"));
const apiError_1 = __importDefault(require("../../../error/apiError"));
const http_status_codes_1 = require("http-status-codes");
const paginationHalper_1 = require("../../../helper/paginationHalper");
const withdrow_constant_1 = require("./withdrow.constant");
const doctorWithDrawRequest = (authUserId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield prisma_1.default.user.findFirst({
        where: {
            id: authUserId,
        },
        include: {
            doctor: true,
        },
    });
    if (!doctor) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Doctor Not Found');
    }
    const doctorFinalWithdrawBalance = Number(data.amount) * 0.8;
    const companyFinalEarnBalance = Number(data.amount) - doctorFinalWithdrawBalance;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        data.finalAmonut = doctorFinalWithdrawBalance;
        data.companyEarn = companyFinalEarnBalance;
        data.doctorId = (_a = doctor.doctor) === null || _a === void 0 ? void 0 : _a.id;
        const completeWithdraw = yield transactionClient.withdraw.create({
            data,
        });
        return completeWithdraw;
    }));
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: withdrow_constant_1.WithdrawSearchAbleFiled.map(filed => ({
                [filed]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.withdraw.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
            doctor: {
                include: {
                    user: {
                        include: {
                            profile: true,
                        },
                    },
                },
            },
        },
        orderBy: options.sortBy
            ? {
                [options.sortBy]: 'asc',
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.withdraw.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.withdraw.findFirst({
        where: { id },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
            doctor: true,
        },
    });
});
const updateByIdIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.withdraw.update({
        where: { id },
        data,
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
            doctor: true,
        },
    });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.withdraw.delete({
        where: { id },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
            doctor: true,
        },
    });
});
const withdrawAccepted = (authUserId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id: authUserId,
        },
        include: {
            doctor: true,
        },
    });
    if (!user) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'user Not Found');
    }
    const doctor = yield prisma_1.default.withdraw.findFirst({
        where: {
            id: data.id,
        },
        include: {
            doctor: {
                include: {
                    user: true,
                },
            },
        },
    });
    const companyBalance = yield prisma_1.default.companyBalance.findMany({});
    if (data.status === 'Complete') {
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c, _d, _e;
            const completeWithdraw = yield transactionClient.withdraw.update({
                where: { id: data.id },
                data: {
                    status: client_1.WithdrawEnumStatus.Complete,
                    withdrawAccptetManagerId: user === null || user === void 0 ? void 0 : user.id,
                },
            });
            const doctorTotalBalance = Number((_b = doctor === null || doctor === void 0 ? void 0 : doctor.doctor) === null || _b === void 0 ? void 0 : _b.balance) - Number(doctor === null || doctor === void 0 ? void 0 : doctor.amount);
            yield transactionClient.doctor.update({
                where: {
                    id: (_c = doctor === null || doctor === void 0 ? void 0 : doctor.doctor) === null || _c === void 0 ? void 0 : _c.id,
                },
                data: {
                    balance: doctorTotalBalance,
                },
            });
            const companyFinalBalance = ((_d = companyBalance[0]) === null || _d === void 0 ? void 0 : _d.balance) + Number(doctor === null || doctor === void 0 ? void 0 : doctor.companyEarn);
            yield transactionClient.companyBalance.update({
                where: {
                    id: (_e = companyBalance[0]) === null || _e === void 0 ? void 0 : _e.id,
                },
                data: {
                    balance: companyFinalBalance,
                },
            });
            const message = `Accepted your withdraw request. withdraw balance ${doctor === null || doctor === void 0 ? void 0 : doctor.amount} BDT. 20% company Earn ${doctor === null || doctor === void 0 ? void 0 : doctor.companyEarn}, final withdraw ${doctor === null || doctor === void 0 ? void 0 : doctor.finalAmonut}`;
            yield transactionClient.notification.create({
                data: {
                    userId: doctor === null || doctor === void 0 ? void 0 : doctor.doctor.user_id,
                    message,
                },
            });
            return completeWithdraw;
        }));
        return result;
    }
    else {
        const completeWithdraw = yield prisma_1.default.withdraw.update({
            where: { id: data.id },
            data: {
                status: client_1.WithdrawEnumStatus.Cancel,
                withdrawAccptetManagerId: user === null || user === void 0 ? void 0 : user.id,
            },
        });
        const message = `Your Withdraw Request Cancel`;
        yield prisma_1.default.notification.create({
            data: {
                userId: doctor === null || doctor === void 0 ? void 0 : doctor.doctor.user_id,
                message,
            },
        });
        return completeWithdraw;
    }
});
exports.WithdrawServices = {
    doctorWithDrawRequest,
    getAllFromDB,
    deleteByIdFromDB,
    updateByIdIntoDB,
    getByIdFromDB,
    withdrawAccepted,
};
