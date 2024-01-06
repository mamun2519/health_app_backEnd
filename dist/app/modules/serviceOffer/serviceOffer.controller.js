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
exports.OfferServiceController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const serviceOffer_service_1 = require('./serviceOffer.service')
const APIResponse_1 = __importDefault(require('../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const pick_1 = require('../../../shared/pick')
// import { ServiceOfferFilterAbleFiled } from '../prescription/prescription.constant'
const pagination_1 = require('../../../constant/pagination')
const serviceOffer_constant_1 = require('./serviceOffer.constant')
const insetIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const result = yield serviceOffer_service_1.ServiceOfferService.insetIntoDB(
      req.body,
      user.user_id,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Offer Create success!',
      data: result,
    })
  }),
)
const getAllFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      serviceOffer_constant_1.ServiceOfferFilterAbleFiled,
    )
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result =
      yield serviceOffer_service_1.ServiceOfferService.getAllFromDB(
        filter,
        options,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Offer fetched success!',
      data: result,
    })
  }),
)
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield serviceOffer_service_1.ServiceOfferService.getByIdFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Offer fetch success!',
      data: result,
    })
  }),
)
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield serviceOffer_service_1.ServiceOfferService.deleteByIdFromDB(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Offer delete success!',
      data: result,
    })
  }),
)
const updateByIdIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield serviceOffer_service_1.ServiceOfferService.updateByIdIntoDB(
        req.params.id,
        req.body,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Offer update success!',
      data: result,
    })
  }),
)
const doctorOfferService = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    const options = (0, pick_1.receiveArrayAndReturnObject)(
      req.query,
      pagination_1.paginationFiled,
    )
    const result =
      yield serviceOffer_service_1.ServiceOfferService.doctorOfferService(
        user.user_id,
        options,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Offer fetched success!',
      data: result,
    })
  }),
)
const addToCart = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    console.log(user)
    // const options = receiveArrayAndReturnObject(req.query, paginationFiled)
    const result = yield serviceOffer_service_1.ServiceOfferService.createCart(
      user.user_id,
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Cart create fetched success!',
      data: result,
    })
  }),
)
const MyCart = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user
    // const options = receiveArrayAndReturnObject(req.query, paginationFiled)
    const result = yield serviceOffer_service_1.ServiceOfferService.MyCart(
      user.user_id,
    )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My Cart Fetch fetched success!',
      data: result,
    })
  }),
)
const singleCartDelete = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const options = receiveArrayAndReturnObject(req.query, paginationFiled)
    const result =
      yield serviceOffer_service_1.ServiceOfferService.singleCartDelete(
        req.params.id,
      )
    ;(0, APIResponse_1.default)(res, {
      success: true,
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'My Cart Fetch fetched success!',
      data: result,
    })
  }),
)
exports.OfferServiceController = {
  addToCart,
  insetIntoDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  getAllFromDB,
  MyCart,
  doctorOfferService,
  singleCartDelete,
}
