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
exports.BloodDonorController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const bloodDonor_service_1 = require('./bloodDonor.service')
const APIResponse_1 = __importDefault(require('../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const pick_1 = require('../../../shared/pick')
const bloodDonor_constant_1 = require('./bloodDonor.constant')
const pagination_1 = require('../../../constant/pagination')
const filtersBloodDonorFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filersData = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      bloodDonor_constant_1.bloodDonorFilterAbleFiled,
    )
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result =
      yield bloodDonor_service_1.BloodDonorService.filtersBloodDonorFromDB(
        filersData,
        pagination,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Blood donor fetch successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const getAllFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const filersData = receiveArrayAndReturnObject(
    //   req.query,
    //   bloodDonorFilterAbleFiled,
    // )
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result =
      yield bloodDonor_service_1.BloodDonorService.getAllFromDB(pagination)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Blood donor fetch successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const filersData = receiveArrayAndReturnObject(
    //   req.query,
    //   bloodDonorFilterAbleFiled,
    // )
    // const pagination = receiveArrayAndReturnObject(req.query, paginationFiled)
    const result = yield bloodDonor_service_1.BloodDonorService.getByIdFromDB(
      req.params.id,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Blood donor fetch successfully',
      // meta: result.meta,
      data: result,
    })
  }),
)
const userDonorRequest = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result =
      yield bloodDonor_service_1.BloodDonorService.userDonorRequest(
        user.user_id,
        pagination,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Blood Donor Request Fetch Successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const AllDonorRequest = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filersData = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      bloodDonor_constant_1.bloodDonorFilterAbleFiled,
    )
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield bloodDonor_service_1.BloodDonorService.AllDonorRequest(
      filersData,
      pagination,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'All Donor Request Fetch Successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const getByIdDonorRequestFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield bloodDonor_service_1.BloodDonorService.getByIdDonorRequestFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Blood Donor Request Fetch Successfully',
      data: result,
    })
  }),
)
const updateDonorRequestStatusByIdFromDB = (0, catchAsync_1.default)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const user = req.user
      const result =
        yield bloodDonor_service_1.BloodDonorService.updateDonorRequestStatusByIdFromDB(
          user,
          req.body,
        )
      ;(0, APIResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Donor Request Status Update Successfully',
        data: result,
      })
    }),
)
const donorRequestUpdateByIdIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield bloodDonor_service_1.BloodDonorService.donorRequestUpdateByIdIntoDB(
        req.params.id,
        req.body,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Donor Request Update Successfully',
      data: result,
    })
  }),
)
const deleteDonorRequestByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield bloodDonor_service_1.BloodDonorService.deleteDonorRequestByIdFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Donor Request delete Successfully',
      data: result,
    })
  }),
)
exports.BloodDonorController = {
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
