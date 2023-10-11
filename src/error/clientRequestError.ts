import { Prisma } from '@prisma/client'
import { IErrorResponse } from '../interface/common'
import { IErrorMessage } from '../interface/error'

const handleClientRequestError = (
  error: Prisma.PrismaClientKnownRequestError,
): IErrorResponse => {
  let errors: IErrorMessage[] = []
  let message = ''
  const statusCode = 400

  if (error.code == 'P2025') {
    message = error.message
    errors = [{ path: '', message: error.message }]
  } else if (error.code == 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = error.message
      errors = [{ path: '', message: error.message }]
    }
  }

  return {
    statusCode,
    message,
    errorMessages: errors,
  }
}

export default handleClientRequestError
