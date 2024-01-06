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
exports.ActivityService = void 0
const http_status_codes_1 = require('http-status-codes')
const apiError_1 = __importDefault(require('../../../error/apiError'))
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const activity_utils_1 = require('./activity.utils')
const userActivity = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f
    const user = yield prisma_1.default.user.findFirst({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    const appointment = yield prisma_1.default.appointment.count({
      where: {
        userId: user.id,
      },
    })
    const donorRequest = yield prisma_1.default.donorRequest.count({
      where: {
        userId: user.id,
      },
    })
    const completeDonation = yield prisma_1.default.donorRequest.count({
      where: {
        userId: user.id,
        status: 'Completed',
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastBookingSchedule = yield prisma_1.default.appointment.findMany({
      take: 1,
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const schedule = {
      date:
        (_b =
          (_a = lastBookingSchedule[0]) === null || _a === void 0
            ? void 0
            : _a.bookingDate) !== null && _b !== void 0
          ? _b
          : 'no date',
      schedule:
        (_d =
          (_c = lastBookingSchedule[0]) === null || _c === void 0
            ? void 0
            : _c.slatTime) !== null && _d !== void 0
          ? _d
          : 'no schedule',
    }
    const myDonarRequest = yield (0, activity_utils_1.MyDonarRequest)(user.id)
    console.log(myDonarRequest)
    return {
      bookingAppointment: appointment,
      donorRequest,
      completeDonation,
      myDonarRequest,
      schedule,
      name: `${
        (_e = user.profile) === null || _e === void 0 ? void 0 : _e.first_name
      }  ${
        (_f = user.profile) === null || _f === void 0 ? void 0 : _f.last_name
      } `,
    }
  })
const donorActivity = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l, _m, _o, _p, _q, _r
    const user = yield prisma_1.default.user.findFirst({
      where: {
        id,
      },
      include: {
        bloodDonor: true,
        profile: true,
      },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    console.log(user)
    const appointment = yield prisma_1.default.appointment.count({
      where: {
        userId: user.id,
      },
    })
    const donorRequest = yield prisma_1.default.donorRequest.count({
      where: {
        donorId:
          (_g = user === null || user === void 0 ? void 0 : user.bloodDonor) ===
            null || _g === void 0
            ? void 0
            : _g.id,
      },
    })
    const pendingRequest = yield prisma_1.default.donorRequest.count({
      where: {
        donorId:
          (_h = user === null || user === void 0 ? void 0 : user.bloodDonor) ===
            null || _h === void 0
            ? void 0
            : _h.id,
        status: 'Pending',
      },
    })
    const completeDonation = yield prisma_1.default.donorRequest.count({
      where: {
        donorId:
          (_j = user === null || user === void 0 ? void 0 : user.bloodDonor) ===
            null || _j === void 0
            ? void 0
            : _j.id,
        status: 'Completed',
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastBookingSchedule = yield prisma_1.default.appointment.findMany({
      take: 1,
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const schedule = {
      date:
        (_l =
          (_k = lastBookingSchedule[0]) === null || _k === void 0
            ? void 0
            : _k.bookingDate) !== null && _l !== void 0
          ? _l
          : 'no date',
      schedule:
        (_o =
          (_m = lastBookingSchedule[0]) === null || _m === void 0
            ? void 0
            : _m.slatTime) !== null && _o !== void 0
          ? _o
          : 'no schedule',
    }
    const myCompleteDonation = yield (0,
    activity_utils_1.MyCompleteBloodDonation)(
      (_p = user === null || user === void 0 ? void 0 : user.bloodDonor) ===
        null || _p === void 0
        ? void 0
        : _p.id,
    )
    console.log(myCompleteDonation)
    return {
      bookingAppointment: appointment,
      donorRequest,
      completeDonation,
      schedule,
      myCompleteDonation,
      pendingRequest,
      name: `${
        (_q = user.profile) === null || _q === void 0 ? void 0 : _q.first_name
      }  ${
        (_r = user.profile) === null || _r === void 0 ? void 0 : _r.last_name
      } `,
    }
  })
const doctorActivity = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t, _u, _v, _w, _x, _y, _z, _0
    const user = yield prisma_1.default.user.findFirst({
      where: {
        id,
      },
      include: {
        // bloodDonor: true,
        doctor: true,
        profile: true,
      },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    const appointment = yield prisma_1.default.appointment.count({
      where: {
        doctorId:
          (_s = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _s === void 0
            ? void 0
            : _s.id,
      },
    })
    const service = yield prisma_1.default.doctorService.count({
      where: {
        doctorId:
          (_t = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _t === void 0
            ? void 0
            : _t.id,
      },
    })
    const donorRequest = yield prisma_1.default.donorRequest.count({
      where: {
        userId: user === null || user === void 0 ? void 0 : user.id,
      },
    })
    const completeDonation = yield prisma_1.default.donorRequest.count({
      where: {
        userId: user === null || user === void 0 ? void 0 : user.id,
        status: 'Completed',
      },
    })
    const pendingWithdraw = yield prisma_1.default.withdraw.count({
      where: {
        doctorId:
          (_u = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _u === void 0
            ? void 0
            : _u.id,
        status: 'Pending',
      },
    })
    const { finalTopPriceService, totalSales } = yield (0,
    activity_utils_1.DoctorTop5ServicePrice)(
      (_v = user === null || user === void 0 ? void 0 : user.doctor) === null ||
        _v === void 0
        ? void 0
        : _v.id,
    )
    const resentWithdraw = yield (0, activity_utils_1.DoctorResentWithdraw)(
      (_w = user === null || user === void 0 ? void 0 : user.doctor) === null ||
        _w === void 0
        ? void 0
        : _w.id,
    )
    return {
      appointment: appointment,
      service,
      resentWithdraw,
      top5MyServicePrice: finalTopPriceService,
      myTotalSales: totalSales,
      balance: Number(
        (_x = user === null || user === void 0 ? void 0 : user.doctor) ===
          null || _x === void 0
          ? void 0
          : _x.balance,
      ),
      patient: Number(
        (_y = user === null || user === void 0 ? void 0 : user.doctor) ===
          null || _y === void 0
          ? void 0
          : _y.total_patient,
      ),
      completeDonation,
      donorRequest,
      pendingWithdraw,
      name: `${
        (_z = user.profile) === null || _z === void 0 ? void 0 : _z.first_name
      }  ${
        (_0 = user.profile) === null || _0 === void 0 ? void 0 : _0.last_name
      } `,
    }
  })
const adminActivity = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _1, _2
    const user = yield prisma_1.default.user.findFirst({
      where: {
        id,
      },
      include: {
        // bloodDonor: true,
        doctor: true,
        profile: true,
      },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    const balance = yield prisma_1.default.companyBalance.findMany({})
    const appointment = yield prisma_1.default.appointment.count({})
    const service = yield prisma_1.default.doctorService.count({})
    const completeDonation = yield prisma_1.default.donorRequest.count({
      where: {
        status: 'Completed',
      },
    })
    const pendingWithdraw = yield prisma_1.default.withdraw.count({
      where: {
        status: 'Pending',
      },
    })
    const doctor = yield prisma_1.default.user.count({
      where: {
        role: 'Doctor',
      },
    })
    const bloodDonor = yield prisma_1.default.user.count({
      where: {
        role: 'BloodDonor',
      },
    })
    const { totalSales, finalTop5Service } = yield (0,
    activity_utils_1.FinalTop5Service)()
    const finalTop5Donor = yield (0, activity_utils_1.FinalTop5Donar)()
    const withdraw = yield prisma_1.default.withdraw.findMany({
      take: 5,
      where: {
        status: 'Complete',
      },
      include: {
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
      orderBy: {
        amount: 'desc',
      },
    })
    const Top5Withdraw = withdraw.map(withdraw => {
      var _a, _b
      return {
        name: `${
          (_a = withdraw.doctor.user.profile) === null || _a === void 0
            ? void 0
            : _a.first_name
        } ${
          (_b = withdraw.doctor.user.profile) === null || _b === void 0
            ? void 0
            : _b.last_name
        }`,
        amount: withdraw.amount,
      }
    })
    return {
      appointment: appointment,
      topService: finalTop5Service,
      topDonor: finalTop5Donor,
      service,
      lastWithdraw: Top5Withdraw,
      balance: Number(balance[0].balance),
      sales: totalSales,
      completeDonation,
      pendingWithdraw,
      doctor,
      bloodDonor,
      name: `${
        (_1 = user.profile) === null || _1 === void 0 ? void 0 : _1.first_name
      }  ${
        (_2 = user.profile) === null || _2 === void 0 ? void 0 : _2.last_name
      } `,
    }
  })
exports.ActivityService = {
  userActivity,
  donorActivity,
  doctorActivity,
  adminActivity,
}
