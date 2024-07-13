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
exports.WithdrawController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const withdraw_services_1 = require('./withdraw.services')
const APIResponse_1 = __importDefault(require('../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const pick_1 = require('../../../shared/pick')
const withdrow_constant_1 = require('./withdrow.constant')
const pagination_1 = require('../../../constant/pagination')
const doctorWithDrawRequest = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const result =
      yield withdraw_services_1.WithdrawServices.doctorWithDrawRequest(
        user.user_id,
        req.body,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Payment Withdraw Request sent successfully',
      data: result,
    })
  }),
)
const withdrawAccepted = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const result = yield withdraw_services_1.WithdrawServices.withdrawAccepted(
      user.user_id,
      req.body.data,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Payment Withdraw Request Accepted successfully',
      data: result,
    })
  }),
)
const getAllFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      withdrow_constant_1.WithdrawFilterAbleFiled,
    )
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result = yield withdraw_services_1.WithdrawServices.getAllFromDB(
      filter,
      options,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Payment Withdraw Fetched successfully',
      data: result,
    })
  }),
)
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield withdraw_services_1.WithdrawServices.getByIdFromDB(
      req.params.id,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Payment Withdraw Fetched successfully',
      data: result,
    })
  }),
)
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield withdraw_services_1.WithdrawServices.deleteByIdFromDB(
      req.params.id,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Payment Withdraw deleted successfully',
      data: result,
    })
  }),
)
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield withdraw_services_1.WithdrawServices.updateByIdIntoDB(
      req.params.id,
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Payment Withdraw Fetched successfully',
      data: result,
    })
  }),
)
exports.WithdrawController = {
  doctorWithDrawRequest,
  withdrawAccepted,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
}
