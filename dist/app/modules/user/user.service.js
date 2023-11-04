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
exports.UserService = void 0
const client_1 = require('@prisma/client')
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const paginationHalper_1 = require('../../../helper/paginationHalper')
const user_constant_1 = require('./user.constant')
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
        OR: user_constant_1.UserSearchAbleFiled.map(filed => ({
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
    const result = yield prisma_1.default.user.findMany({
      skip,
      take: limit,
      where: whereConditions,
      include: {
        bloodDonor: true,
        doctor: true,
        // user: true,
        // permanent_Address: true,
        // present_Address: true,
        // education: true,
        profile: {
          include: {
            permanent_Address: true,
            present_Address: true,
            education: true,
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
    const total = yield prisma_1.default.user.count({ where: whereConditions })
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
    return yield prisma_1.default.user.findFirst({
      where: { id },
      include: {
        bloodDonor: true,
        doctor: {
          include: {
            doctorServices: {
              include: {
                serviceSalt: true,
              },
            },
          },
        },
        // user: true,
        // permanent_Address: true,
        // present_Address: true,
        // education: true,
        profile: {
          include: {
            permanent_Address: true,
            present_Address: true,
            education: true,
          },
        },
      },
    })
  })
const updateByIdIntoDB = (authUserId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b
    const user = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
      include: {
        bloodDonor: true,
        doctor: true,
        profile: {
          include: {
            permanent_Address: true,
            present_Address: true,
            education: true,
          },
        },
      },
    })
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User not found!',
      )
    }
    if (payload && payload.profile) {
      yield prisma_1.default.profile.update({
        where: {
          user_id: user.id,
        },
        data: payload.profile,
      })
    }
    if (
      payload &&
      (payload === null || payload === void 0 ? void 0 : payload.presentAddress)
    ) {
      yield prisma_1.default.presentAddress.update({
        where: {
          profile_Id:
            (_a = user === null || user === void 0 ? void 0 : user.profile) ===
              null || _a === void 0
              ? void 0
              : _a.id,
        },
        data: payload.presentAddress,
      })
    }
    if (
      payload &&
      (payload === null || payload === void 0
        ? void 0
        : payload.permanentAddress)
    ) {
      yield prisma_1.default.permanentAddress.update({
        where: {
          profile_Id:
            (_b = user === null || user === void 0 ? void 0 : user.profile) ===
              null || _b === void 0
              ? void 0
              : _b.id,
        },
        data: payload.permanentAddress,
      })
    }
    if (payload && payload.education) {
      yield prisma_1.default.education.update({
        where: {
          id: payload.education.id,
        },
        data: payload.education,
      })
    }
    return user
  })
const bloodDonorRequest = (authUserId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
      where: { id: authUserId },
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
    const donor = yield prisma_1.default.bloodDonor.findFirst({
      where: {
        id: payload.donorId,
      },
      include: {
        user: true,
      },
    })
    if (!donor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Blood donor Not Found',
      )
    }
    payload.userId = user.id
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        var _c
        const donorRequests = yield transactionClient.donorRequest.create({
          data: payload,
        })
        yield transactionClient.bloodDonor.update({
          where: {
            id: donor.id,
          },
          data: {
            totalPendingRequest: {
              increment: 1,
            },
          },
        })
        const message = `${
          (_c = user.profile) === null || _c === void 0 ? void 0 : _c.user_name
        } donor request to you. his need ${
          payload.quantity
        } beg blood and donned date ${payload.donnetDate}.`
        yield transactionClient.notification.create({
          data: {
            message,
            userId: donor.user.id,
          },
        })
        // Broadcast the new notification to all connected clients
        // io.emit('new-notification', notification);
        return donorRequests
      }),
    )
    return result
  })
const myDonorRequest = (authUserId, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, paginationHalper_1.calculatePagination)(
      pagination,
    )
    console.log(pagination)
    const result = yield prisma_1.default.donorRequest.findMany({
      skip,
      take: limit,
      where: {
        userId: authUserId,
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
        user: {
          include: {
            profile: true,
          },
        },
      },
      // orderBy:
      //   pagination.sortBy && pagination.sortOrder
      //     ? {
      //         [pagination.sortBy]: pagination.sortOrder,
      //       }
      //     : {
      //       user: "dsce"
      //     },
    })
    const total = yield prisma_1.default.donorRequest.count({
      where: {
        userId: authUserId,
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
const myDonorReviewFromDB = (authUserId, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, paginationHalper_1.calculatePagination)(
      pagination,
    )
    const result = yield prisma_1.default.donorReview.findMany({
      take: limit,
      skip,
      where: { userId: authUserId },
      include: {
        bloodDonor: {
          include: {
            user: true,
          },
        },
      },
      orderBy:
        pagination.sortBy && pagination.sortOrder
          ? {
              [pagination.sortBy]: pagination.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
    })
    const total = yield prisma_1.default.donorReview.count({
      where: { userId: authUserId },
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
const myAppointment = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const result = yield prisma_1.default.appointment.findMany({
      take: limit,
      skip,
      where: {
        userId: authUserId,
      },
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
      where: {
        userId: authUserId,
      },
    })
    return {
      meta: {
        limit,
        page,
        total,
      },
      data: result,
    }
  })
const myPrescription = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const result = yield prisma_1.default.prescription.findMany({
      take: limit,
      skip,
      where: {
        userId: authUserId,
      },
      include: {
        user: true,
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
        userId: authUserId,
      },
    })
    return {
      meta: {
        limit,
        page,
        total,
      },
      data: result,
    }
  })
const myPaymentList = (authUserId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, paginationHalper_1.calculatePagination)(
      options,
    )
    const result = yield prisma_1.default.payment.findMany({
      take: limit,
      skip,
      where: {
        userId: authUserId,
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
            appointments: true,
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
    const total = yield prisma_1.default.payment.count({
      where: {
        userId: authUserId,
      },
    })
    return {
      meta: {
        limit,
        page,
        total,
      },
      data: result,
    }
  })
const filtersDoctorFromDB = (filters, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { district, experience, specialist } = filters
    console.log(filters)
    const { skip, limit, page } = (0, paginationHalper_1.calculatePagination)(
      pagination,
    )
    const whereConditions = {
      profile: {
        user: {
          role: client_1.UserRole.Doctor,
          doctor: {
            experience: experience,
            specialist,
          },
        },
        present_Address: {
          district: district,
        },
      },
    }
    // if (searchTerm) {
    //   whereConditions.OR = bloodDonorSearchAbleFiled.map(searchFiled => ({
    //     [searchFiled]: {
    //       contains: searchTerm,
    //       mode: 'insensitive',
    //     },
    //   }))
    // }
    const donors = yield prisma_1.default.user.findMany({
      skip,
      take: limit,
      where: whereConditions,
      orderBy:
        pagination.sortBy && pagination.sortOrder
          ? {
              [pagination.sortBy]: pagination.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
      include: {
        doctor: true,
        profile: {
          include: {
            present_Address: true,
          },
        },
      },
    })
    const total = yield prisma_1.default.user.count({ where: whereConditions })
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: donors,
    }
  })
const userProfile = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(user.role)
    if (user.role === client_1.UserRole.User) {
      return yield prisma_1.default.user.findFirst({
        where: {
          id: user.user_id,
        },
        include: {
          profile: {
            include: {
              permanent_Address: true,
              present_Address: true,
              education: true,
            },
          },
        },
      })
    } else if (user.role === client_1.UserRole.BloodDonor) {
      return yield prisma_1.default.bloodDonor.findFirst({
        where: {
          user_id: user.user_id,
        },
        include: {
          user: {
            include: {
              profile: {
                include: {
                  permanent_Address: true,
                  present_Address: true,
                  education: true,
                },
              },
            },
          },
        },
      })
    } else if (user.role === client_1.UserRole.Doctor) {
      return yield prisma_1.default.doctor.findFirst({
        where: { user_id: user.user_id },
        include: {
          user: {
            include: {
              profile: {
                include: {
                  present_Address: true,
                  permanent_Address: true,
                  education: true,
                },
              },
            },
          },
        },
      })
    } else {
      return yield prisma_1.default.user.findFirst({
        where: {
          id: user.user_id,
        },
        include: {
          profile: {
            include: {
              permanent_Address: true,
              present_Address: true,
              education: true,
            },
          },
        },
      })
    }
  })
const deleteUser = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.user.delete({ where: { id } })
  })
const AllUserFromDb = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
      where: {
        role: client_1.UserRole.User,
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
    })
    return result
  })
const AllAdminFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
      where: {
        role: client_1.UserRole.Admin,
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
    })
    return result
  })
const myNotification = authUserId =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const user = await prisma.user.findFirst({ where: { id: authUserId } })
    // if (!user) {
    //   throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
    // }
    const result = yield prisma_1.default.notification.findMany({
      where: {
        userId: authUserId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return result
  })
const updateUserProfile = (authUserId, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('id', authUserId)
    console.log(data)
    const { address, profile } = data
    const user = yield prisma_1.default.user.findUnique({
      where: { id: authUserId },
      include: { profile: true },
    })
    console.log(user)
    if (!user) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User Not Found',
      )
    }
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e
        const profiles = yield transactionClient.profile.update({
          where: { user_id: authUserId },
          data: Object.assign({}, profile),
        })
        console.log(profiles)
        const allreadyExist = yield prisma_1.default.presentAddress.findFirst({
          where: {
            profile_Id:
              (_d = user.profile) === null || _d === void 0 ? void 0 : _d.id,
          },
        })
        if (!allreadyExist) {
          if (user.profile && address) {
            yield transactionClient.presentAddress.create({
              data: {
                profile_Id:
                  (_e =
                    user === null || user === void 0
                      ? void 0
                      : user.profile) === null || _e === void 0
                    ? void 0
                    : _e.id,
                address: address.address,
                sub_district: address.sub_district,
                district: address.district,
              },
            })
          }
        } else {
          if (
            (user === null || user === void 0 ? void 0 : user.profile) &&
            address
          ) {
            yield transactionClient.presentAddress.update({
              where: { profile_Id: user.profile.id },
              data: {
                address:
                  address === null || address === void 0
                    ? void 0
                    : address.address,
                sub_district:
                  address === null || address === void 0
                    ? void 0
                    : address.sub_district,
                district:
                  address === null || address === void 0
                    ? void 0
                    : address.district,
              },
            })
          }
        }
        return profiles
      }),
    )
    return result
  })
exports.UserService = {
  myNotification,
  updateUserProfile,
  userProfile,
  filtersDoctorFromDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  bloodDonorRequest,
  myDonorRequest,
  myDonorReviewFromDB,
  myAppointment,
  myPrescription,
  myPaymentList,
  deleteUser,
  AllUserFromDb,
  AllAdminFromDB,
}
