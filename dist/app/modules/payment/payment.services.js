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
exports.PaymentService = void 0;
const prisma_1 = __importDefault(require("../../../prisma/prisma"));
const apiError_1 = __importDefault(require("../../../error/apiError"));
const http_status_codes_1 = require("http-status-codes");
const paginationHalper_1 = require("../../../helper/paginationHalper");
const payment_constant_1 = require("./payment.constant");
const appointment_services_1 = require("../appointment/appointment.services");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51L1nmNCGpaTt0RU81oq26j6Ta7gwb9pGlOOwxjeXAQgefsXMvmRxFUopKE2St6GDbDpxjUug0KxRyqzL6oKarPcR00lqLjh70r');
const createPayment = (authUserId, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const user = yield prisma_1.default.user.findFirst({ where: { id: authUserId } });
    if (!user) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User Not Found');
    }
    // const service = await prisma.doctorService.findFirst({
    //   where: {
    //     id: data.serviceId,
    //   },
    // })
    const doctor = yield prisma_1.default.doctor.findFirst({
        where: { id: data.doctorId },
    });
    const newBalance = Number(doctor === null || doctor === void 0 ? void 0 : doctor.balance) + Number(data.price);
    console.log(data);
    data.userId = authUserId;
    data.price = Number(data.price);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const payment = transactionClient.payment.create({ data });
        yield transactionClient.doctor.update({
            where: {
                id: data.doctorId,
            },
            data: {
                balance: newBalance,
            },
        });
        return payment;
    }));
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    console.log(options);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: payment_constant_1.PaymentSearchAbleFiled.map(filed => ({
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
    const result = yield prisma_1.default.payment.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
            service: {
                include: {
                    doctor: {
                        include: {
                            doctorServices: {
                                include: {
                                    serviceOffers: true,
                                    serviceSalt: true,
                                },
                            },
                        },
                    },
                    appointments: true,
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
    const total = yield prisma_1.default.payment.count({ where: whereConditions });
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
    return yield prisma_1.default.payment.findFirst({
        where: { id },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
            service: {
                include: {
                    doctor: {
                        include: {
                            user: {
                                include: {
                                    profile: true,
                                },
                            },
                            doctorServices: {
                                include: {
                                    serviceOffers: true,
                                    serviceSalt: true,
                                },
                            },
                        },
                    },
                    appointments: true,
                },
            },
        },
    });
});
const updateByIdIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.payment.update({
        where: { id },
        data,
        include: {
            service: {
                include: {
                    doctor: {
                        include: {
                            doctorServices: {
                                include: {
                                    serviceOffers: true,
                                    serviceSalt: true,
                                },
                            },
                        },
                    },
                    appointments: true,
                },
            },
        },
    });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.delete({
        where: { id },
        include: {
            service: {
                include: {
                    doctor: {
                        include: {
                            doctorServices: {
                                include: {
                                    serviceOffers: true,
                                    serviceSalt: true,
                                },
                            },
                        },
                    },
                    appointments: true,
                },
            },
        },
    });
    console.log(result);
    return result;
});
const createCompanyBalance = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.companyBalance.create({ data });
});
//
const OrderAppointment = (appointment, payment, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({ where: { id: authUserId } });
    if (!user) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User Not Found');
    }
    yield appointment_services_1.AppointmentService.insetIntoDB(appointment, authUserId);
    yield createPayment(authUserId, payment);
    return {
        message: 'Success',
    };
});
const paymentByStripe = (price) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('price', price);
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: Number(price),
        currency: 'usd',
        // payment_method_types: ['card'],
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return {
        clientSecret: paymentIntent.client_secret,
    };
});
const applyPromoCode = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const matchPromoCode = yield prisma_1.default.serviceOffer.findFirst({
        where: {
            serviceId: data.id,
            promoCode: data.promoCode,
            status: 'Active',
        },
    });
    if (!matchPromoCode) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Invalid Promo Code!');
    }
    return matchPromoCode;
});
exports.PaymentService = {
    OrderAppointment,
    applyPromoCode,
    createPayment,
    getAllFromDB,
    getByIdFromDB,
    updateByIdIntoDB,
    deleteByIdFromDB,
    createCompanyBalance,
    paymentByStripe,
};
