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
exports.DoctorController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const doctor_service_1 = require('./doctor.service')
const APIResponse_1 = __importDefault(require('../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const pick_1 = require('../../../shared/pick')
const doctor_constant_1 = require('./doctor.constant')
const pagination_1 = require('../../../constant/pagination')
const doctor_interface_1 = require('./doctor.interface')
const createServiceIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user
    console.log(user)
    const result = yield doctor_service_1.Doctor.createServiceIntoDB(
      req.body,
      user.user_id,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Service Create successfully',
      data: result,
    })
  }),
)
const myServiceFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.myServiceFromDB(
      user.user_id,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Service fetch successfully',
      meta: result === null || result === void 0 ? void 0 : result.meta,
      data: result === null || result === void 0 ? void 0 : result.data,
    })
  }),
)
const getAllFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      doctor_constant_1.doctorServiceFilterAbleFiled,
    )
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.getAllFromDB(filter, options)
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Service fetch successfully',
      data: result,
    })
  }),
)
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('query', req.query.date)
    const result = yield doctor_service_1.Doctor.getByIdFromDB(
      req.params.id,
      req.query.date,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Service fetch successfully',
      data: result,
    })
  }),
)
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_service_1.Doctor.updateByIdIntoDB(
      req.params.id,
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Service update successfully',
      data: result,
    })
  }),
)
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_service_1.Doctor.deleteByIdFromDB(req.params.id)
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Service delete successfully',
      data: result,
    })
  }),
)
const myBookingAppointment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.myBookingAppointment(
      user.user_id,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My booking appointment fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const myActiveGoogleMeetService = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.myActiveGoogleMeetService(
      user.user_id,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My active google meet fetched successfully',
      data: result,
    })
  }),
)
const activeMeet = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params)
    const result = yield doctor_service_1.Doctor.activeMeet(req.params.id)
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My active google meet fetched successfully',
      data: result,
    })
  }),
)
const myCompletedGoogleMeetService = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.myCompletedGoogleMeetService(
      user.user_id,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My complete google meet fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const myGoogleMeet = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.myGoogleMeet(
      user.user_id,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My all google meet fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const myPaymentList = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.myPaymentList(
      user.user_id,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My payment list fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const myWithdrawList = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.myWithdrawList(
      user.user_id,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My Withdraw list fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const myPrescription = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.myPrescription(
      user.user_id,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My Prescription fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
const allDoctorFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.allDoctorFromDB(options)
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'All Doctor fetched successfully',
      data: result.data,
      meta: result.meta,
    })
  }),
)
const getFilterServiceFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filersData = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      doctor_interface_1.ServicerAbleFiled,
    )
    const pagination = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield doctor_service_1.Doctor.getFilterServiceFromDB(
      filersData,
      pagination,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Doctor services fetch successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
exports.DoctorController = {
  allDoctorFromDB,
  createServiceIntoDB,
  myServiceFromDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  myBookingAppointment,
  myActiveGoogleMeetService,
  myCompletedGoogleMeetService,
  myPaymentList,
  myWithdrawList,
  getFilterServiceFromDB,
  myGoogleMeet,
  myPrescription,
  activeMeet,
}
