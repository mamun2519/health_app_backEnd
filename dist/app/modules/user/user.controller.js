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
exports.UserController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const user_service_1 = require('./user.service')
const APIResponse_1 = __importDefault(require('../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const pick_1 = require('../../../shared/pick')
const pagination_1 = require('../../../constant/pagination')
const user_constant_1 = require('./user.constant')
const user_interface_1 = require('./user.interface')
const filtersDoctorFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filersData = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      user_interface_1.DoctorAbleFiled,
    )
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.filtersDoctorFromDB(
      filersData,
      pagination,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Doctor fetch successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const getAllUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      user_constant_1.UserFilterAbleFiled,
    )
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.getAllFromDB(
      filter,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User Fetched Success',
      data: result,
    })
  }),
)
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getByIdFromDB(req.params.id)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User Fetched Success',
      data: result,
    })
  }),
)
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //TODO - use Auth token user and send service auth user id
    const result = yield user_service_1.UserService.updateByIdIntoDB(
      req.params.id,
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User update Successfully',
      data: result,
    })
  }),
)
const bloodDonorRequest = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    console.log(user)
    const result = yield user_service_1.UserService.bloodDonorRequest(
      user.user_id,
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Blood Donor Request Successfully',
      data: result,
    })
  }),
)
const myDonorRequest = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.myDonorRequest(
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
const myDonorReviewFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.myDonorReviewFromDB(
      user.user_id,
      pagination,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Donor review Request Fetch Successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const myAppointment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.myAppointment(
      user.user_id,
      pagination,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'My Appointment Fetched Successfully',
      data: result,
    })
  }),
)
const myPrescription = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.myPrescription(
      user.user_id,
      pagination,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'My Prescription Fetch Successfully',
      data: result,
    })
  }),
)
const myPaymentList = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.myPaymentList(
      user.user_id,
      pagination,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'My Payment list Fetch Successfully',
      data: result,
    })
  }),
)
const userProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const result = yield user_service_1.UserService.userProfile(user)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'My Profile  Fetch Successfully',
      data: result,
    })
  }),
)
const deleteUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.deleteUser(req.params.id)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User Delete Successfully',
      data: result,
    })
  }),
)
const AllUserFromDb = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.AllUserFromDb(options)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User Get Successfully',
      data: result,
    })
  }),
)
const AllAdminFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield user_service_1.UserService.AllAdminFromDB(options)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Admin Get Successfully',
      data: result,
    })
  }),
)
const myNotification = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const result = yield user_service_1.UserService.myNotification(user.user_id)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'My Notification  Fetch Successfully',
      data: result,
    })
  }),
)
const updateUserProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const result = yield user_service_1.UserService.updateUserProfile(
      user.user_id,
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'profile Update   Successfully',
      data: result,
    })
  }),
)
exports.UserController = {
  myNotification,
  getAllUser,
  getByIdFromDB,
  updateByIdIntoDB,
  bloodDonorRequest,
  myDonorRequest,
  myDonorReviewFromDB,
  myAppointment,
  myPrescription,
  myPaymentList,
  filtersDoctorFromDB,
  userProfile,
  deleteUser,
  AllUserFromDb,
  AllAdminFromDB,
  updateUserProfile,
}
