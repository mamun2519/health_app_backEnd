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
exports.PrescriptionService = void 0
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const paginationHalper_1 = require('../../../helper/paginationHalper')
const serviceOffer_constant_1 = require('../serviceOffer/serviceOffer.constant')
const insetIntoDB = (data, authUserId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { prescription, haltReport, medicine } = data
    console.log(prescription)
    const doctor = yield prisma_1.default.doctor.findFirst({
      where: { user_id: authUserId },
    })
    if (!doctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User doctor found',
      )
    }
    const appointment = yield prisma_1.default.appointment.findFirst({
      where: {
        id: prescription.appointmentId,
      },
      include: {
        user: true,
      },
    })
    if (!appointment) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'appointment not found',
      )
    }
    console.log(appointment.doctorId)
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        // prescription.userId = appointment.userId
        const userPrescription = yield transactionClient.prescription.create({
          data: {
            userId: appointment.userId,
            appointmentId: prescription.appointmentId,
            title: prescription.title,
            advice: prescription.advice,
            submitDate: prescription.submitDate,
            doctorId: appointment.doctorId,
          },
        })
        console.log(userPrescription)
        if (medicine) {
          for (let i = 0; i < medicine.length; i++) {
            yield transactionClient.medicine.create({
              data: {
                prescriptionId: userPrescription.id,
                duration: medicine[i].duration,
                eat: medicine[i].eat,
                eatingTime: medicine[i].eatingTime,
                advice: medicine[i].advice,
                durgName: medicine[i].durgName,
              },
            })
          }
        }
        if (haltReport) {
          for (let i = 0; i < haltReport.length; i++) {
            yield transactionClient.healtReport.create({
              data: {
                prescriptionId: userPrescription.id,
                testName: haltReport[i].testName,
                description: haltReport[i].description,
              },
            })
          }
        }
        const message = `doctor assign your medicine prescription. submit date ${prescription.submitDate}`
        yield transactionClient.notification.create({
          data: {
            userId: appointment.userId,
            message,
          },
        })
        return userPrescription
      }),
    )
    return result
  })
const getAllFromDB = (filters, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const { searchTerm } = filters,
      filterData = __rest(filters, ['searchTerm'])
    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        OR: serviceOffer_constant_1.PrescriptionSearchAbleFiled.map(filed => ({
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
    const result = yield prisma_1.default.prescription.findMany({
      skip,
      take: limit,
      where: whereConditions,
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        appointment: {
          include: {
            service: true,
          },
        },
        healtReports: true,
        medicines: true,
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
    const total = yield prisma_1.default.prescription.count({
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
const getByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.prescription.findFirst({
      where: { id },
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
        appointment: {
          include: {
            doctor: true,
            service: true,
          },
        },
        medicines: true,
        healtReports: true,
      },
    })
  })
const updateByIdIntoDB = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { prescription, haltReport, medicine } = data
    console.log(data)
    const result = yield prisma_1.default.prescription.update({
      where: { id },
      data: prescription,
    })
    const existMedicine = yield prisma_1.default.medicine.findFirst({
      where: { prescriptionId: id },
    })
    if (!existMedicine) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'NOt Found',
      )
    }
    const existHealtReport = yield prisma_1.default.healtReport.findFirst({
      where: { prescriptionId: id },
    })
    yield prisma_1.default.medicine.update({
      where: {
        id:
          existMedicine === null || existMedicine === void 0
            ? void 0
            : existMedicine.id,
      },
      data: medicine,
    })
    yield prisma_1.default.healtReport.update({
      where: {
        id:
          existHealtReport === null || existHealtReport === void 0
            ? void 0
            : existHealtReport.id,
      },
      data: haltReport,
    })
    // todo --feture same work
    // if (medicine) {
    //   for (let i = 0; i < medicine.length; i++) {
    //     medicine.map((med: Medicine) =>
    //       prisma.medicine.update({
    //         where: { id: med.id },
    //         data: {
    //           duration: med.duration,
    //           eat: med.eat,
    //           eatingTime: med.eatingTime,
    //           advice: med.advice,
    //           durgName: med.durgName, // Fixed typo here
    //         },
    //       }),
    //     )
    //   }
    // }
    // if (haltReport) {
    //   haltReport.map((haltRep: HealtReport) =>
    //     prisma.healtReport.update({
    //       where: { id: haltRep.id },
    //       data: {
    //         description: haltRep.description,
    //         testName: haltRep.testName,
    //       },
    //     }),
    //   )
    // }
    return result
  })
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.prescription.delete({ where: { id } })
  })
const doctorAssignPrescription = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b
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
        'Doctor Id Not Found',
      )
    }
    const { page, limit, skip } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const result = yield prisma_1.default.prescription.findMany({
      skip,
      take: limit,
      where: {
        doctorId:
          (_a = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _a === void 0
            ? void 0
            : _a.id,
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
    const total = yield prisma_1.default.prescription.count({
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
exports.PrescriptionService = {
  insetIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  doctorAssignPrescription,
}
