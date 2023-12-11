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
exports.MyDonarRequest =
  exports.MyCompleteBloodDonation =
  exports.DoctorResentWithdraw =
  exports.DoctorTop5ServicePrice =
  exports.FinalTop5Donar =
  exports.FinalTop5Service =
    void 0
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const FinalTop5Service = () =>
  __awaiter(void 0, void 0, void 0, function* () {
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
    return { finalTop5Service, totalSales }
  })
exports.FinalTop5Service = FinalTop5Service
const FinalTop5Donar = () =>
  __awaiter(void 0, void 0, void 0, function* () {
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
    return finalTop5Donor
  })
exports.FinalTop5Donar = FinalTop5Donar
const DoctorTop5ServicePrice = doctorId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const sales = yield prisma_1.default.payment.findMany({
      where: {
        doctorId,
      },
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
    const finalTopPriceService = top5Prices.map(service => {
      return {
        serviceName: service.service.title,
        price: service.price,
        category: service.service.category,
      }
    })
    return { finalTopPriceService, totalSales }
  })
exports.DoctorTop5ServicePrice = DoctorTop5ServicePrice
const DoctorResentWithdraw = doctorId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const withdraw = yield prisma_1.default.withdraw.findMany({
      take: 5,
      where: {
        status: 'Complete',
        doctorId: doctorId,
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
    const Top5Withdraw = withdraw
      .map(withdraw => {
        return {
          amount: withdraw.amount,
          companyEarn: withdraw.companyEarn,
          date: withdraw.createdAt,
        }
      })
      .slice(0, 5)
    return Top5Withdraw
  })
exports.DoctorResentWithdraw = DoctorResentWithdraw
const MyCompleteBloodDonation = donorId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const donor = yield prisma_1.default.donorRequest.findMany({
      where: {
        status: 'Completed',
        donorId,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    })
    const finalDonation = donor
      .map(donation => {
        var _a, _b
        return {
          requestUserName: `${
            (_a = donation.user.profile) === null || _a === void 0
              ? void 0
              : _a.first_name
          } ${
            (_b = donation.user.profile) === null || _b === void 0
              ? void 0
              : _b.last_name
          }`,
          // date: donation.c
          total: donation.quantity,
          location: donation.location,
        }
      })
      .slice(0, 8)
    return finalDonation
  })
exports.MyCompleteBloodDonation = MyCompleteBloodDonation
const MyDonarRequest = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const donor = yield prisma_1.default.donorRequest.findMany({
      where: {
        userId,
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
    const finalDonation = donor
      .map(donation => {
        var _a, _b
        return {
          donarName: `${
            (_a = donation.donor.user.profile) === null || _a === void 0
              ? void 0
              : _a.first_name
          } ${
            (_b = donation.donor.user.profile) === null || _b === void 0
              ? void 0
              : _b.last_name
          }`,
          // date: donation.c
          total: donation.quantity,
          status: donation.status,
        }
      })
      .slice(0, 8)
    return finalDonation
  })
exports.MyDonarRequest = MyDonarRequest
