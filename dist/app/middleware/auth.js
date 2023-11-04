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
exports.auth = void 0
const apiError_1 = __importDefault(require('../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const jwtHelper_1 = require('../../helper/jwtHelper')
const config_1 = require('../../config')
const auth =
  (...userRole) =>
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization
        if (!token) {
          throw new apiError_1.default(
            http_status_codes_1.StatusCodes.UNAUTHORIZED,
            'You are not authorized',
          )
        }
        let verifiedUser = null
        verifiedUser = jwtHelper_1.jwtHelper.verifyToken(
          token,
          config_1.env_config.jwt.secret_token,
        )
        req.user = verifiedUser
        if (!userRole.includes(verifiedUser.role)) {
          throw new apiError_1.default(
            http_status_codes_1.StatusCodes.FORBIDDEN,
            'Forbidden',
          )
        }
        next()
      } catch (error) {
        next(error)
      }
    })
exports.auth = auth
