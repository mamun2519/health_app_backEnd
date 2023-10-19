'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ServiceOfferService = void 0
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const paginationHalper_1 = require('../../../helper/paginationHalper')
const prescription_constant_1 = require('../prescription/prescription.constant')
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const insetIntoDB = (data, authUserId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a
    const user = yield prisma_1.default.user.findFirst({
      where: {
        id: authUserId,
      },
      include: {
        doctor: true,
      },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor Not found',
      )
    }
    data.doctorId =
      (_a = user.doctor) === null || _a === void 0 ? void 0 : _a.id
    return yield prisma_1.default.serviceOffer.create({ data })
  })
const getAllFromDB = (filets, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const { searchTerm } = filets,
      filterData = __rest(filets, ['searchTerm'])
    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        OR: prescription_constant_1.ServiceOfferSearchAbleFiled.map(filed => ({
          [filed]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      })
    }
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => ({
          [key]: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            equals: filterData[key],
          },
        })),
      })
    }
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {}
    const result = yield prisma_1.default.serviceOffer.findMany({
      skip,
      take: limit,
      where: whereConditions,
      include: {
        service: true,
      },
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
    })
    const total = yield prisma_1.default.serviceOffer.count({
      where: whereConditions,
    })
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    }
  })
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceOffer.delete({
      where: { id },
    })
  })
const updateByIdIntoDB = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceOffer.update({
      where: { id },
      data,
    })
  })
const getByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceOffer.findFirst({
      where: { id },
    })
  })
const doctorOfferService = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const user = yield prisma_1.default.user.findFirst({
      where: {
        id: authUserId,
      },
      include: {
        doctor: true,
      },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor Not found',
      )
    }
    const result = yield prisma_1.default.serviceOffer.findMany({
      skip,
      take: limit,
      where: {
        doctorId:
          (_b = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _b === void 0
            ? void 0
            : _b.id,
      },
      include: {
        service: true,
      },
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
    })
    const total = yield prisma_1.default.serviceOffer.count({
      where: {
        doctorId:
          (_c = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _c === void 0
            ? void 0
            : _c.id,
      },
    })
    return {
      meta: {
        total,
        limit,
        page,
      },
      data: result,
    }
  })
const createCart = (authUserId, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    data.userId = authUserId
    const result = yield prisma_1.default.cart.create({ data })
    return result
  })
const MyCart = authUserId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    const result = yield prisma_1.default.cart.findMany({
      where: {
        userId: authUserId,
      },
    })
    return result
  })
exports.ServiceOfferService = {
  MyCart,
  createCart,
  insetIntoDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getByIdFromDB,
  getAllFromDB,
  doctorOfferService,
}
