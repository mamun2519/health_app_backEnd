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
exports.AppointmentService = void 0
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const paginationHalper_1 = require('../../../helper/paginationHalper')
const appointment_constant_1 = require('./appointment.constant')
const insetIntoDB = (data, authUserId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
      include: { profile: true },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not found',
      )
    }
    const doctor = yield prisma_1.default.doctor.findFirst({
      where: {
        id: data.doctorId,
      },
      include: {
        user: true,
      },
    })
    const doctorSerialCheck = yield prisma_1.default.appointment.findMany({
      where: {
        serviceId: data.serviceId,
        bookingDate: data.bookingDate,
      },
    })
    data.serialNo = doctorSerialCheck.length + 1
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        var _a
        data.userId = authUserId
        const userAppointment = yield transactionClient.appointment.create({
          data,
          include: { service: true },
        })
        const message = `${
          (_a = user.profile) === null || _a === void 0 ? void 0 : _a.first_name
        } a appointment in your service. Appointment date ${data.bookingDate}`
        yield transactionClient.doctor.update({
          where: {
            id: data.doctorId,
          },
          data: {
            total_patient: {
              increment: 1,
            },
          },
        })
        yield transactionClient.notification.create({
          data: {
            userId:
              doctor === null || doctor === void 0 ? void 0 : doctor.user_id,
            message,
          },
        })
        return userAppointment
      }),
    )
    return result
  })
const getAllFromDB = (filter, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filter,
      filterData = __rest(filter, ['searchTerm'])
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const andCondition = []
    if (searchTerm) {
      andCondition.push({
        OR: appointment_constant_1.AppointmentSearchAbleFiled.map(filed => ({
          [filed]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      })
    }
    if (Object.keys(filterData).length > 0) {
      andCondition.push({
        AND: Object.keys(filterData).map(key => ({
          [key]: {
            equals: filterData[key],
          },
        })),
      })
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {}
    const result = yield prisma_1.default.appointment.findMany({
      where: whereCondition,
      skip,
      take: limit,
      include: {
        service: true,
        user: {
          include: {
            profile: true,
          },
        },
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
    const total = yield prisma_1.default.appointment.count({
      where: whereCondition,
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
const getByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.appointment.findFirst({
      where: { id },
      include: {
        service: {
          include: {
            GoogleMeet: true,
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
        user: {
          include: {
            profile: true,
          },
        },
      },
    })
  })
const updateByIdIntoDB = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(data)
    if (data.status == 'Reject' || data.status === 'Cancel') {
      const result = yield prisma_1.default.appointment.update({
        where: { id },
        data: {
          status: data.status,
          slatTime: 'Cancel',
        },
      })
      return result
    } else {
      return yield prisma_1.default.appointment.update({ where: { id }, data })
    }
  })
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.appointment.delete({ where: { id } })
  })
exports.AppointmentService = {
  insetIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
}
