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
exports.DonorReviewController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const donorReview_service_1 = require('./donorReview.service')
const APIResponse_1 = __importDefault(require('../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const createDonorReviewIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = req.user
    const result =
      yield donorReview_service_1.DonorReviewService.createDonorReviewIntoDB(
        user.user_id,
        req.body,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Donor review Successfully',
      data: result,
    })
  }),
)
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield donorReview_service_1.DonorReviewService.updateByIdIntoDB(
        req.params.id,
        req.body,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Donor review update Successfully',
      data: result,
    })
  }),
)
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donorReview_service_1.DonorReviewService.getByIdFromDB(
      req.params.id,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Donor review fetch Successfully',
      data: result,
    })
  }),
)
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield donorReview_service_1.DonorReviewService.deleteByIdFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Donor review delete Successfully',
      data: result,
    })
  }),
)
exports.DonorReviewController = {
  createDonorReviewIntoDB,
  updateByIdIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
}
