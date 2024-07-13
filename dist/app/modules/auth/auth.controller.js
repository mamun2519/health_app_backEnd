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
exports.AuthController = void 0
const auth_service_1 = require('./auth.service')
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const config_1 = require('../../../config')
const APIResponse_1 = __importDefault(require('../../../shared/APIResponse'))
const http_status_codes_1 = require('http-status-codes')
const createUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.createUserFromDB(req.body)
    const { user, token } = result
    //set refresh token into cookie
    const cookieOptions = {
      secure: config_1.env_config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', cookieOptions)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User Create Successfully!',
      data: {
        user,
        userToken: token.accessToken,
      },
    })
  }),
)
const createDonor = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.createBloodDonorFromDB(
      req.body,
    )
    const { user, token } = result
    //set refresh token into cookie
    const cookieOptions = {
      secure: config_1.env_config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', cookieOptions)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User Create Successfully!',
      data: {
        user,
        userToken: token.accessToken,
      },
    })
  }),
)
const createDoctor = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.createDoctorFromDB(req.body)
    const { user, token } = result
    //set refresh token into cookie
    const cookieOptions = {
      secure: config_1.env_config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', cookieOptions)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User Create Successfully!',
      data: {
        user,
        userToken: token.accessToken,
      },
    })
  }),
)
const userLogin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.userLoginIntoDB(req.body)
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'User Login Successfully!',
      data: result,
    })
  }),
)
const forgetPassword = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.forgetPasswordIntoDB(
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Password forget Successfully!',
      data: result,
    })
  }),
)
const resetPassword = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.resetPasswordIntoDB(
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Password reset Successfully!',
      data: result,
    })
  }),
)
const changeUserName = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.changeUserNameIntoDB(
      req.params.id,
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Username change Successfully!',
      data: result,
    })
  }),
)
const requestForgetPassword = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.requestForgetPassword(
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Password Request Successfully!',
      data: result,
    })
  }),
)
const CheckValidationResetCode = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.CheckValidationResetCode(
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Password Validation Reset Code Successfully!',
      data: result,
    })
  }),
)
const forgetPasswordWithCode = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.forgetPasswordWithCode(
      req.body,
    )
    ;(0, APIResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Password Forget With Code Successfully!',
      data: result,
    })
  }),
)
exports.AuthController = {
  createUser,
  createDonor,
  createDoctor,
  userLogin,
  forgetPassword,
  resetPassword,
  changeUserName,
  requestForgetPassword,
  forgetPasswordWithCode,
  CheckValidationResetCode,
}
