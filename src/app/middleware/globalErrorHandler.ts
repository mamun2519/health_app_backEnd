import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { env_config } from '../../config'
import { IErrorMessage } from '../../interface/error'
import Send_API_Error from '../../error/apiError'
import { Prisma } from '@prisma/client'
import handleValidationError from '../../error/validationError'
import handleClientRequestError from '../../error/clientRequestError'
import { ZodError } from 'zod'
import handleZodValidationError from '../../error/zodValidationError'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  // console error if not production
  // eslint-disable-next-line no-unused-expressions
  env_config.env === 'development'
    ? console.log('Global Error-----', { error })
    : console.log('Global Error---', { error })

  // sending error formate
  let statusCode = 500
  let message = 'Something is wrong, Please Try Again'
  let errorMessages: IErrorMessage[] = []

  //handle Api Error
  if (error instanceof Send_API_Error) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = error.message ? [{ path: '', message: error.message }] : []
  }
  // handle validation Error With prisma
  else if (error instanceof Prisma.PrismaClientValidationError) {
    const findingError = handleValidationError(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
    // handle user client request error with prisma
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const findingError = handleClientRequestError(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
    // handle zod validation error
  } else if (error instanceof ZodError) {
    const findingError = handleZodValidationError(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: env_config.env !== 'production' ? error.stack : undefined,
  })
}

export default globalErrorHandler
