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
exports.Doctor = void 0
const client_1 = require('@prisma/client')
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const doctor_utils_1 = require('./doctor.utils')
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const paginationHalper_1 = require('../../../helper/paginationHalper')
const doctor_constant_1 = require('./doctor.constant')
const createServiceIntoDB = (data, authUserId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a
    const doctor = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
      include: {
        doctor: true,
      },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.OK,
        'Doctor Not found!',
      )
    }
    data.service.doctorId =
      (_a = doctor.doctor) === null || _a === void 0 ? void 0 : _a.id
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        const DocService = yield transactionClient.doctorService.create({
          data: data.service,
          include: {
            serviceSalt: true,
          },
        })
        const DoctorSlat = (0, doctor_utils_1.generateSalt)(
          data.salt.startTime,
          data.salt.endTime,
          Number(data.salt.duration),
        )
        console.log(DoctorSlat)
        data.salt.serviceId = DocService.id
        yield transactionClient.serviceSalt.create({
          data: {
            serviceId: DocService.id,
            duration: data.salt.duration,
            startTime: data.salt.startTime,
            endTime: data.salt.endTime,
            salt: DoctorSlat,
          },
        })
        return DocService
      }),
    )
    // todo: when doctor create a his service. then show notification "service create successfully"
    return result
  })
const getAllFromDB = (filters, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(filters)
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const { searchTerm } = filters,
      filterData = __rest(filters, ['searchTerm'])
    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        OR: doctor_constant_1.doctorServiceSearchAbleFiled.map(filed => ({
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
    const result = yield prisma_1.default.doctorService.findMany({
      skip,
      take: limit,
      where: whereConditions,
      include: {
        serviceOffers: true,
        serviceReviews: true,
        serviceSalt: true,
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
    })
    const total = yield prisma_1.default.doctorService.count({
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
const myServiceFromDB = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const doctor = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
      include: {
        doctor: true,
      },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.OK,
        'Doctor Not found!',
      )
    }
    const result = yield prisma_1.default.doctorService.findMany({
      skip,
      take: limit,
      where: {
        doctorId:
          (_b =
            doctor === null || doctor === void 0 ? void 0 : doctor.doctor) ===
            null || _b === void 0
            ? void 0
            : _b.id,
      },
      include: {
        serviceOffers: true,
        serviceReviews: true,
        serviceSalt: true,
        doctor: true,
      },
      orderBy: options.sortBy
        ? {
            [options.sortBy]: 'asc',
          }
        : {
            createdAt: 'desc',
          },
    })
    if (result.length == 0) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'Your service not found',
      )
    }
    const total = yield prisma_1.default.doctorService.count({
      where: {
        doctorId:
          (_c =
            doctor === null || doctor === void 0 ? void 0 : doctor.doctor) ===
            null || _c === void 0
            ? void 0
            : _c.id,
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
const getByIdFromDB = (id, date) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e
    // console.log(id)
    const cUrrentDate =
      date == undefined ? (0, doctor_utils_1.currentDate)() : date
    // console.log(cUrrentDate)
    const searchAppointment = yield prisma_1.default.appointment.findMany({
      where: {
        bookingDate: cUrrentDate,
      },
    })
    // console.log(searchAppointment)
    const doctor = yield prisma_1.default.doctorService.findFirst({
      where: { id },
      include: {
        serviceOffers: true,
        serviceReviews: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
        serviceSalt: true,
      },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.OK,
        'Doctor service Not found!',
      )
    }
    const result = yield prisma_1.default.doctorService.findFirst({
      where: {
        id,
      },
      include: {
        doctor: {
          include: {
            user: {
              include: {
                profile: {
                  include: {
                    present_Address: true,
                  },
                },
              },
            },
          },
        },
        serviceOffers: true,
        serviceReviews: true,
        serviceSalt: true,
      },
    })
    const finalSlat = (0, doctor_utils_1.matchSlatTime)(
      searchAppointment,
      (_d =
        result === null || result === void 0 ? void 0 : result.serviceSalt) ===
        null || _d === void 0
        ? void 0
        : _d.salt,
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ;(_e =
      result === null || result === void 0 ? void 0 : result.serviceSalt) ===
      null || _e === void 0
      ? void 0
      : (_e.salt = finalSlat)
    return result
  })
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doctorServices = yield prisma_1.default.doctorService.findFirst({
      where: { id },
      include: {
        serviceOffers: true,
        serviceReviews: true,
        serviceSalt: true,
      },
    })
    if (!doctorServices) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.OK,
        'Doctor service Not found!',
      )
    }
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.serviceSalt.delete({
          where: {
            serviceId: doctorServices.id,
          },
        })
        const service = yield transactionClient.doctorService.delete({
          where: {
            id,
          },
          include: {
            serviceOffers: true,
            serviceReviews: true,
            serviceSalt: true,
          },
        })
        return service
      }),
    )
    return result
  })
const updateByIdIntoDB = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(data)
    const doctorServices = yield prisma_1.default.doctorService.findFirst({
      where: { id },
      include: {
        serviceOffers: true,
        serviceReviews: true,
        serviceSalt: true,
      },
    })
    if (!doctorServices) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.OK,
        'Doctor service Not found!',
      )
    }
    yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        var _f
        if (data.service) {
          yield transactionClient.doctorService.update({
            where: {
              id,
            },
            data: data.service,
            include: {
              serviceOffers: true,
              serviceReviews: true,
              serviceSalt: true,
            },
          })
        }
        if (data.salt) {
          const DoctorSlat = (0, doctor_utils_1.generateSalt)(
            data.salt.startTime,
            data.salt.endTime,
            Number(data.salt.duration),
          )
          yield transactionClient.serviceSalt.update({
            where: {
              id:
                (_f =
                  doctorServices === null || doctorServices === void 0
                    ? void 0
                    : doctorServices.serviceSalt) === null || _f === void 0
                  ? void 0
                  : _f.id,
            },
            data: {
              duration: data.salt.duration,
              startTime: data.salt.startTime,
              endTime: data.salt.endTime,
              salt: DoctorSlat,
            },
          })
        }
      }),
    )
    return {
      message: 'Updated',
    }
  })
const myBookingAppointment = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h
    const { page, skip, limit } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const findDoctor = yield prisma_1.default.user.findFirst({
      where: {
        id: authUserId,
      },
      include: {
        doctor: true,
      },
    })
    if (!findDoctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'user not found',
      )
    }
    const result = yield prisma_1.default.appointment.findMany({
      take: limit,
      skip,
      where: {
        doctorId:
          (_g =
            findDoctor === null || findDoctor === void 0
              ? void 0
              : findDoctor.doctor) === null || _g === void 0
            ? void 0
            : _g.id,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        service: true,
      },
      orderBy: options.sortBy
        ? {
            [options.sortBy]: 'asc',
          }
        : {
            createdAt: 'desc',
          },
    })
    const total = yield prisma_1.default.appointment.count({
      where: {
        doctorId:
          (_h =
            findDoctor === null || findDoctor === void 0
              ? void 0
              : findDoctor.doctor) === null || _h === void 0
            ? void 0
            : _h.id,
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
const myActiveGoogleMeetService = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit } = (0, paginationHalper_1.calculatePagination)(options)
    const doctor = yield prisma_1.default.doctor.findFirst({
      where: {
        user_id: authUserId,
      },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor Not found',
      )
    }
    return yield prisma_1.default.googleMeet.findMany({
      take: limit,
      skip,
      where: {
        doctorId: doctor.id,
        // status: meetingEnumStatus.Active,
      },
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
      orderBy: options.sortBy
        ? {
            [options.sortBy]: 'asc',
          }
        : {
            createdAt: 'desc',
          },
    })
  })
const activeMeet = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(id)
    return yield prisma_1.default.googleMeet.findFirst({
      where: {
        status: 'Active',
        serviceId: id,
        // status: meetingEnumStatus.Active,
      },
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
const myCompletedGoogleMeetService = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const doctor = yield prisma_1.default.doctor.findFirst({
      where: {
        user_id: authUserId,
      },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor Not found',
      )
    }
    const result = yield prisma_1.default.googleMeet.findMany({
      skip,
      take: limit,
      where: {
        doctorId: authUserId,
        status: client_1.meetingEnumStatus.Complete,
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
      where: {
        doctorId: authUserId,
        status: client_1.meetingEnumStatus.Complete,
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
const myGoogleMeet = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(authUserId)
    const { skip, limit, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const doctor = yield prisma_1.default.doctor.findFirst({
      where: {
        user_id: authUserId,
      },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor Not found',
      )
    }
    const result = yield prisma_1.default.googleMeet.findMany({
      skip,
      take: limit,
      where: {
        doctorId: doctor.user_id,
        // status: meetingEnumStatus.Complete,
      },
      include: {
        meetingRequests: true,
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
    console.log(result)
    const total = yield prisma_1.default.googleMeet.count({
      where: {
        doctorId: authUserId,
        // status: meetingEnumStatus.Complete,
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
const myPaymentList = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k
    const { skip, limit, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const doctor = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
      include: { doctor: true },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor not found',
      )
    }
    const result = yield prisma_1.default.payment.findMany({
      skip,
      take: limit,
      where: {
        doctorId:
          (_j = doctor.doctor) === null || _j === void 0 ? void 0 : _j.id,
      },
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
            appointments: {
              include: {
                user: true,
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
    })
    const total = yield prisma_1.default.payment.count({
      where: {
        doctorId:
          (_k = doctor.doctor) === null || _k === void 0 ? void 0 : _k.id,
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
const myWithdrawList = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m
    const { skip, limit, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const doctor = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
      include: { doctor: true },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor not found',
      )
    }
    const result = yield prisma_1.default.withdraw.findMany({
      skip,
      take: limit,
      where: {
        doctorId:
          (_l =
            doctor === null || doctor === void 0 ? void 0 : doctor.doctor) ===
            null || _l === void 0
            ? void 0
            : _l.id,
      },
      include: {
        user: {
          include: {
            profile: true,
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
    })
    const total = yield prisma_1.default.withdraw.count({
      where: {
        doctorId:
          (_m =
            doctor === null || doctor === void 0 ? void 0 : doctor.doctor) ===
            null || _m === void 0
            ? void 0
            : _m.id,
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
const allDoctorFromDB = options =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const result = yield prisma_1.default.user.findMany({
      skip,
      take: limit,
      where: {
        role: client_1.UserRole.Doctor,
      },
      include: {
        doctor: {
          include: {
            user: {
              include: { profile: true },
            },
            doctorServices: true,
          },
        },
        profile: true,
      },
      orderBy: options.sortBy
        ? {
            [options.sortBy]: 'asc',
          }
        : {
            createdAt: 'desc',
          },
    })
    return {
      meta: {
        total: 100,
        page,
        limit,
      },
      data: result,
    }
  })
const getFilterServiceFromDB = (filters, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const { day, category, duration } = filters
    const whereConditions = {
      serviceDay: {
        has: day,
      },
      serviceSalt: {
        duration: duration,
      },
      category: category,
      // price: {
      //   gte: price,
      // },
      // profile: {
      //   user: {
      //     role: UserRole.Doctor,
      //     doctor: {
      //       experience: experience,
      //       specialist,
      //     },
      //   },
      //   present_Address: {
      //     district: district,
      //   },
      // },
    }
    // if (searchTerm) {
    //   andConditions.push({
    //     OR: doctorServiceSearchAbleFiled.map(filed => ({
    //       [filed]: {
    //         contains: searchTerm,
    //         mode: 'insensitive',
    //       },
    //     })),
    //   })
    // }
    // if (Object.keys(filterData).length > 0) {
    //   andConditions.push({
    //     AND: Object.keys(filterData).map(key => ({
    //       [key]: {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         equals: (filterData as any)[key],
    //       },
    //     })),
    //   })
    // }
    const result = yield prisma_1.default.doctorService.findMany({
      skip,
      take: limit,
      where: whereConditions,
      include: {
        serviceOffers: true,
        serviceReviews: true,
        serviceSalt: true,
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
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
    })
    const total = yield prisma_1.default.doctorService.count({
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
const myPrescription = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(authUserId)
    const { skip, limit, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const doctor = yield prisma_1.default.doctor.findFirst({
      where: {
        user_id: authUserId,
      },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Doctor Not found',
      )
    }
    console.log(doctor)
    const result = yield prisma_1.default.prescription.findMany({
      skip,
      take: limit,
      where: {
        doctorId: doctor.id,
        // status: meetingEnumStatus.Complete,
      },
      include: {
        appointment: {
          include: {
            service: true,
          },
        },
        user: {
          include: {
            profile: true,
          },
        },
        medicines: true,
        healtReports: true,
      },
      orderBy: options.sortBy
        ? {
            [options.sortBy]: 'asc',
          }
        : {
            createdAt: 'desc',
          },
    })
    const total = yield prisma_1.default.prescription.count({
      where: {
        doctorId: doctor.id,
        // status: meetingEnumStatus.Complete,
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
exports.Doctor = {
  myPrescription,
  allDoctorFromDB,
  createServiceIntoDB,
  myServiceFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getAllFromDB,
  myBookingAppointment,
  myActiveGoogleMeetService,
  myCompletedGoogleMeetService,
  myPaymentList,
  myWithdrawList,
  getFilterServiceFromDB,
  myGoogleMeet,
  activeMeet,
}
