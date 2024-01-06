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
exports.BloodDonorService = void 0
const client_1 = require('@prisma/client')
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const bloodDonor_constant_1 = require('./bloodDonor.constant')
const paginationHalper_1 = require('../../../helper/paginationHalper')
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const filtersBloodDonorFromDB = (filters, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { district, blood_group, searchTerm, sub_district } = filters
    console.log(filters)
    const { skip, limit, page } = (0, paginationHalper_1.calculatePagination)(
      pagination,
    )
    const whereConditions = {
      district: district,
      // police_station: police_station,
      sub_district: sub_district,
      profile: {
        blood_group: blood_group,
        user: {
          role: client_1.UserRole.BloodDonor,
        },
      },
    }
    if (searchTerm) {
      whereConditions.OR = bloodDonor_constant_1.bloodDonorSearchAbleFiled.map(
        searchFiled => ({
          [searchFiled]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        }),
      )
    }
    const donors = yield prisma_1.default.presentAddress.findMany({
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
        profile: {
          include: {
            user: {
              include: {
                bloodDonor: true,
              },
            },
          },
        },
      },
    })
    const total = yield prisma_1.default.presentAddress.count({
      where: whereConditions,
    })
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: donors,
    }
  })
const getAllFromDB = (
  // filters: IFiltersUserDonorRequest,
  pagination,
) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page } = (0, paginationHalper_1.calculatePagination)(
      pagination,
    )
    const donors = yield prisma_1.default.user.findMany({
      skip,
      take: limit,
      where: {
        role: client_1.UserRole.BloodDonor,
      },
      include: {
        profile: {
          include: {
            education: true,
            permanent_Address: true,
            present_Address: true,
          },
        },
        bloodDonor: true,
      },
      orderBy: pagination.sortBy
        ? {
            [pagination.sortBy]: 'asc',
          }
        : {
            createdAt: 'desc',
          },
    })
    const total = yield prisma_1.default.user.count({
      where: { role: client_1.UserRole.BloodDonor },
    })
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: donors,
    }
  })
const getByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const donors = yield prisma_1.default.user.findFirst({
      where: {
        role: client_1.UserRole.BloodDonor,
        id: id,
      },
      include: {
        profile: {
          include: {
            education: true,
            permanent_Address: true,
            present_Address: true,
          },
        },
        bloodDonor: {
          include: {
            donorReviews: true,
            donorRequests: true,
          },
        },
      },
    })
    return donors
  })
const userDonorRequest = (authUserId, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b
    const donor = yield prisma_1.default.user.findUnique({
      where: {
        id: authUserId,
      },
      include: {
        bloodDonor: true,
      },
    })
    if (!donor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Blood donor not found!',
      )
    }
    const { page, skip, limit } = (0, paginationHalper_1.calculatePagination)(
      pagination,
    )
    const result = yield prisma_1.default.donorRequest.findMany({
      skip,
      take: limit,
      where: {
        donor: {
          id:
            (_a = donor.bloodDonor) === null || _a === void 0 ? void 0 : _a.id,
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    })
    const total = yield prisma_1.default.donorRequest.count({
      where: {
        donorId:
          (_b = donor.bloodDonor) === null || _b === void 0 ? void 0 : _b.id,
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
const AllDonorRequest = (filters, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit } = (0, paginationHalper_1.calculatePagination)(
      pagination,
    )
    const { searchTerm } = filters,
      filterData = __rest(filters, ['searchTerm'])
    console.log(searchTerm)
    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        OR: bloodDonor_constant_1.bloodDonorSearchAbleFiled.map(filed => ({
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
    const result = yield prisma_1.default.donorRequest.findMany({
      skip,
      take: limit,
      where: whereConditions,
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: pagination.sortBy
        ? {
            [pagination.sortBy]: 'asc',
          }
        : {
            quantity: 'desc',
          },
    })
    const total = yield prisma_1.default.donorRequest.count({})
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    }
  })
const getByIdDonorRequestFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.donorRequest.findUnique({
      where: { id },
      include: {
        donor: {
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
        user: {
          include: {
            profile: true,
          },
        },
      },
    })
  })
const updateDonorRequestStatusByIdFromDB = (authUser, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const donorRequestData = yield prisma_1.default.donorRequest.findUnique({
      where: {
        id: payload.id,
      },
    })
    if (!donorRequestData) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Donor Request Data not found!',
      )
    }
    // check status condition
    if (
      payload.status == donorRequestData.status &&
      payload.status !== client_1.DonorRequestStatus.Accepted
    ) {
      if (donorRequestData.status == client_1.DonorRequestStatus.Cancel) {
        throw new apiError_1.default(
          http_status_codes_1.StatusCodes.NOT_FOUND,
          'already cancel request',
        )
      } else if (
        donorRequestData.status == client_1.DonorRequestStatus.Completed
      ) {
        throw new apiError_1.default(
          http_status_codes_1.StatusCodes.NOT_FOUND,
          'Already complete request',
        )
      } else {
        throw new apiError_1.default(
          http_status_codes_1.StatusCodes.NOT_FOUND,
          'Only you can update accepted donor request status',
        )
      }
    } else if (
      payload.status == donorRequestData.status &&
      payload.status !== client_1.DonorRequestStatus.Completed
    ) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Only you can update complete donor request status',
      )
    } else if (
      payload.status == donorRequestData.status &&
      payload.status !== client_1.DonorRequestStatus.Cancel
    ) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Only you can update Cancel donor request status',
      )
    }
    // if updated status accepted then condition accepted
    if (payload.status == client_1.DonorRequestStatus.Accepted) {
      yield prisma_1.default.$transaction(transactionClient =>
        __awaiter(void 0, void 0, void 0, function* () {
          const updatedStatus = yield transactionClient.donorRequest.update({
            where: {
              id: payload.id,
            },
            data: {
              status: payload.status,
            },
            include: {
              user: true,
              donor: true,
            },
          })
          const message = `blood donor accepted your donor request.please meet the donner and colleted blood.`
          yield transactionClient.notification.create({
            data: {
              userId: updatedStatus.user.id,
              message,
            },
          })
          // update donor total pending request
          yield transactionClient.bloodDonor.update({
            where: {
              id: updatedStatus.donorId,
            },
            data: {
              totalPendingRequest: {
                decrement: 1,
              },
            },
          })
        }),
      )
    }
    // if updated status complete then condition accepted
    else if (payload.status == client_1.DonorRequestStatus.Completed) {
      yield prisma_1.default.$transaction(transactionClient =>
        __awaiter(void 0, void 0, void 0, function* () {
          const updatedStatus = yield transactionClient.donorRequest.update({
            where: {
              id: payload.id,
            },
            data: {
              status: payload.status,
            },
            include: {
              user: true,
              donor: true,
            },
          })
          const message = `donor share complete Successfully`
          yield transactionClient.notification.create({
            data: {
              userId: updatedStatus.donor.user_id,
              message,
            },
          })
          yield transactionClient.bloodDonor.update({
            where: {
              id: updatedStatus.donorId,
            },
            data: {
              total_donnet: {
                increment: 1,
              },
              reward: {
                increment: 5,
              },
            },
          })
        }),
      )
    }
    // if updated status cancel then condition accepted
    if (payload.status == client_1.DonorRequestStatus.Cancel) {
      yield prisma_1.default.$transaction(transactionClient =>
        __awaiter(void 0, void 0, void 0, function* () {
          const updatedStatus = yield transactionClient.donorRequest.update({
            where: {
              id: payload.id,
            },
            data: {
              status: payload.status,
            },
            include: {
              user: true,
              donor: true,
            },
          })
          const message =
            authUser.role === client_1.UserRole.User
              ? `user cancel her donor request`
              : `donor cancel your donor request.`
          yield transactionClient.notification.create({
            data: {
              userId:
                authUser.role === client_1.UserRole.User
                  ? updatedStatus.donor.user_id
                  : updatedStatus.user.id,
              message,
            },
          })
          yield transactionClient.bloodDonor.update({
            where: {
              id: updatedStatus.donorId,
            },
            data: {
              totalPendingRequest: {
                decrement: 1,
              },
            },
          })
        }),
      )
    }
    return {
      message: 'Status Update Successfully',
    }
  })
const donorRequestUpdateByIdIntoDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.donorRequest.update({
      where: {
        id,
      },
      data: payload,
    })
  })
const deleteDonorRequestByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.donorRequest.delete({ where: { id } })
  })
exports.BloodDonorService = {
  filtersBloodDonorFromDB,
  getAllFromDB,
  getByIdFromDB,
  userDonorRequest,
  getByIdDonorRequestFromDB,
  updateDonorRequestStatusByIdFromDB,
  donorRequestUpdateByIdIntoDB,
  deleteDonorRequestByIdFromDB,
  AllDonorRequest,
}
