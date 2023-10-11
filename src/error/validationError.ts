import { Prisma } from '@prisma/client'
import { IErrorMessage } from '../interface/error'
import { IErrorResponse } from '../interface/common'

const handleValidationError = (
  error: Prisma.PrismaClientValidationError,
): IErrorResponse => {
  const statusCode = 400
  const errors: IErrorMessage[] = [
    {
      path: '',
      message: error.message,
    },
  ]

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
