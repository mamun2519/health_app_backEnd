'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const config_1 = require('../../config')
const apiError_1 = __importDefault(require('../../error/apiError'))
const client_1 = require('@prisma/client')
const validationError_1 = __importDefault(
  require('../../error/validationError'),
)
const clientRequestError_1 = __importDefault(
  require('../../error/clientRequestError'),
)
const zod_1 = require('zod')
const zodValidationError_1 = __importDefault(
  require('../../error/zodValidationError'),
)
const globalErrorHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next,
) => {
  // console error if not production
  // eslint-disable-next-line no-unused-expressions
  config_1.env_config.env === 'development'
    ? console.log('Global Error-----', { error })
    : console.log('Global Error---', { error })
  // sending error formate
  let statusCode = 500
  let message = 'Something is wrong, Please Try Again'
  let errorMessages = []
  //handle Api Error
  if (error instanceof apiError_1.default) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = error.message ? [{ path: '', message: error.message }] : []
  }
  // handle validation Error With prisma
  else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
    const findingError = (0, validationError_1.default)(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
    // handle user client request error with prisma
  } else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
    const findingError = (0, clientRequestError_1.default)(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
    // handle zod validation error
  } else if (error instanceof zod_1.ZodError) {
    const findingError = (0, zodValidationError_1.default)(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config_1.env_config.env !== 'production' ? error.stack : undefined,
  })
}
exports.default = globalErrorHandler
