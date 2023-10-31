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
exports.ServiceReviewController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const serviceReview_services_1 = require('./serviceReview.services')
const APIResponse_1 = __importDefault(require('../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const insetIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const result =
      yield serviceReview_services_1.ServiceReviewServices.insetIntoDB(
        user.user_id,
        req.body,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Review Added Successfully',
      data: result,
    })
  }),
)
const myReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const result =
      yield serviceReview_services_1.ServiceReviewServices.myReview(user.userId)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Review fetched Successfully',
      data: result,
    })
  }),
)
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield serviceReview_services_1.ServiceReviewServices.getByIdFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Review fetched Successfully',
      data: result,
    })
  }),
)
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield serviceReview_services_1.ServiceReviewServices.deleteByIdFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Review deleted Successfully',
      data: result,
    })
  }),
)
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield serviceReview_services_1.ServiceReviewServices.updateByIdIntoDB(
        req.params.id,
        req.body,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Review updated Successfully',
      data: result,
    })
  }),
)
const getServiceWithReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield serviceReview_services_1.ServiceReviewServices.getServiceWithReview(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Review fetch Successfully',
      data: result,
    })
  }),
)
const getAllReviewFromDb = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield serviceReview_services_1.ServiceReviewServices.getAllReviewFromDb()
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Review fetch Successfully',
      data: result,
    })
  }),
)
exports.ServiceReviewController = {
  getAllReviewFromDb,
  insetIntoDB,
  myReview,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getServiceWithReview,
}
