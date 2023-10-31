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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.MeetingRequestService = void 0
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const paginationHalper_1 = require('../../../helper/paginationHalper')
const createMeetingRequestIntoDB = (authUserId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not found',
      )
    }
    payload.userId = authUserId
    const appointment = yield prisma_1.default.appointment.findFirst({
      where: { id: payload.appointmentId, userId: authUserId },
    })
    if (
      (appointment === null || appointment === void 0
        ? void 0
        : appointment.serialNo) == payload.serialNo
    ) {
      payload.verifay = true
    } else {
      payload.verifay = false
    }
    if (!appointment) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Appointment Not found',
      )
    }
    const result = yield prisma_1.default.meetingRequest.create({
      data: {
        meetingId: payload.meetingId,
        appointmentId: payload.appointmentId,
        verifay: payload.verifay,
        serialNo: payload.serialNo,
        phoneNumber: payload.phoneNumber,
        userId: payload.userId,
        doctorId: appointment.doctorId,
      },
    })
    return result
  })
const updateByIdIntoDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.meetingRequest.update({
      where: { id },
      data: payload,
    })
  })
const getByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.meetingRequest.findUnique({
      where: { id },
    })
  })
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.meetingRequest.delete({ where: { id } })
  })
const doctorMeetingRequest = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b
    const user = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
      include: {
        doctor: true,
      },
    })
    const { limit, skip, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor Not Found',
      )
    }
    const result = yield prisma_1.default.meetingRequest.findMany({
      skip,
      take: limit,
      where: {
        doctorId:
          (_a = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _a === void 0
            ? void 0
            : _a.id,
      },
      include: {
        user: {
          include: { profile: true },
        },
        appointment: true,
      },
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : { createdAt: 'desc' },
    })
    const total = yield prisma_1.default.meetingRequest.count({
      where: {
        doctorId:
          (_b = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _b === void 0
            ? void 0
            : _b.id,
      },
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
exports.MeetingRequestService = {
  createMeetingRequestIntoDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  getByIdFromDB,
  doctorMeetingRequest,
}
