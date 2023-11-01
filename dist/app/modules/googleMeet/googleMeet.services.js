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
exports.GoogleMeetService = void 0
const client_1 = require('@prisma/client')
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const paginationHalper_1 = require('../../../helper/paginationHalper')
const insetIntoDB = (authUserId, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield prisma_1.default.doctor.findFirst({
      where: { user_id: authUserId },
      include: { user: true },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'doctor not found',
      )
    }
    const isActiveMeet = yield prisma_1.default.googleMeet.findFirst({
      where: {
        status: client_1.meetingEnumStatus.Active,
        serviceId: data.serviceId,
      },
    })
    if (isActiveMeet) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'Yor Meet link already active.',
      )
    }
    data.doctorId = doctor.id
    const result = yield prisma_1.default.googleMeet.create({
      data,
      include: {
        service: true,
      },
    })
    return result
  })
const getByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(id)
    return yield prisma_1.default.googleMeet.findFirst({
      where: { id },
      include: {
        service: true,
        meetingRequests: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    })
  })
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.googleMeet.delete({ where: { id } })
  })
const updateByIdIntoDB = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.googleMeet.update({ where: { id }, data })
  })
const updateStatusAndDeleteGoogleMeet = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        const updateGoogleMeet = yield transactionClient.googleMeet.update({
          where: { id },
          data: {
            status: client_1.meetingEnumStatus.Complete,
          },
        })
        if (updateGoogleMeet) {
          yield transactionClient.googleMeet.delete({ where: { id } })
        }
        return updateGoogleMeet
      }),
    )
    return result
  })
const getAllActiveMeetFromDB = options =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const result = yield prisma_1.default.googleMeet.findMany({
      skip,
      take: limit,
      where: {
        status: client_1.meetingEnumStatus.Active,
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
    const total = yield prisma_1.default.googleMeet.count({
      where: { status: client_1.meetingEnumStatus.Active },
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
exports.GoogleMeetService = {
  insetIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  updateStatusAndDeleteGoogleMeet,
  getAllActiveMeetFromDB,
}
