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
    return {
      bookingAppointment: appointment,
      donorRequest,
      completeDonation,
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
    var _g, _h, _j, _k, _l, _m, _o, _p, _q
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
    return {
      bookingAppointment: appointment,
      donorRequest,
      completeDonation,
      schedule,
      pendingRequest,
      name: `${
        (_p = user.profile) === null || _p === void 0 ? void 0 : _p.first_name
      }  ${
        (_q = user.profile) === null || _q === void 0 ? void 0 : _q.last_name
      } `,
    }
  })
const doctorActivity = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _r, _s, _t, _u, _v, _w, _x
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
          (_r = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _r === void 0
            ? void 0
            : _r.id,
      },
    })
    const service = yield prisma_1.default.doctorService.count({
      where: {
        doctorId:
          (_s = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _s === void 0
            ? void 0
            : _s.id,
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
          (_t = user === null || user === void 0 ? void 0 : user.doctor) ===
            null || _t === void 0
            ? void 0
            : _t.id,
        status: 'Pending',
      },
    })
    return {
      appointment: appointment,
      service,
      balance: Number(
        (_u = user === null || user === void 0 ? void 0 : user.doctor) ===
          null || _u === void 0
          ? void 0
          : _u.balance,
      ),
      patient: Number(
        (_v = user === null || user === void 0 ? void 0 : user.doctor) ===
          null || _v === void 0
          ? void 0
          : _v.total_patient,
      ),
      completeDonation,
      donorRequest,
      pendingWithdraw,
      name: `${
        (_w = user.profile) === null || _w === void 0 ? void 0 : _w.first_name
      }  ${
        (_x = user.profile) === null || _x === void 0 ? void 0 : _x.last_name
      } `,
    }
  })
const adminActivity = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _y, _z
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
    const sales = yield prisma_1.default.payment.findMany({
      include: {
        service: {
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
        },
      },
    })
    const totalSales = sales.reduce((acc, obj) => acc + obj.price, 0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueObjects = {}
    sales.forEach(obj => {
      const key = obj.serviceId
      if (uniqueObjects[key]) {
        uniqueObjects[key].price += obj.price
      } else {
        uniqueObjects[key] = Object.assign({}, obj)
      }
    })
    const uniqueArrayOfObjects = Object.values(uniqueObjects)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniqueArrayOfObjects.sort((a, b) => b.price - a.price)
    // Get the top 5 unique objects with the highest prices
    const top5Prices = uniqueArrayOfObjects.slice(0, 5)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalTop5Service = top5Prices.map(service => {
      return {
        doctorName: `${service.service.doctor.user.profile.first_name} ${service.service.doctor.user.profile.last_name}`,
        serviceName: service.service.title,
        price: service.price,
      }
    })
    const donorRequest = yield prisma_1.default.donorRequest.findMany({
      where: {
        status: 'Completed',
      },
      include: {
        donor: {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueDonorObjects = {}
    donorRequest.forEach(obj => {
      const key = obj === null || obj === void 0 ? void 0 : obj.donorId
      if (uniqueDonorObjects[key]) {
        uniqueDonorObjects[key].quantity += obj.quantity
      } else {
        uniqueDonorObjects[key] = Object.assign({}, obj)
      }
    })
    const uniqueDonor = Object.values(uniqueDonorObjects)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniqueDonor.sort((a, b) => b.price - a.price)
    // Get the top 5 unique objects with the highest prices
    const top5Donor = uniqueDonor.slice(0, 5)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalTop5Donor = top5Donor.map(donor => {
      return {
        donorName: `${donor.donor.user.profile.first_name} ${donor.donor.user.profile.last_name}`,
        bloodGroup: donor.donor.user.profile.blood_group,
        totalBloodDonatedQuantity: donor.quantity,
      }
    })
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
    console.log(withdraw)
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
        (_y = user.profile) === null || _y === void 0 ? void 0 : _y.first_name
      }  ${
        (_z = user.profile) === null || _z === void 0 ? void 0 : _z.last_name
      } `,
    }
  })
exports.ActivityService = {
  userActivity,
  donorActivity,
  doctorActivity,
  adminActivity,
}
