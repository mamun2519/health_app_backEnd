import { ZodError, ZodIssue } from 'zod'
import { IErrorResponse } from '../interface/common'
import { IErrorMessage } from '../interface/error'

const handleZodValidationError = (error: ZodError): IErrorResponse => {
  const statusCode = 400
  const errors: IErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })

  return {
    statusCode,
    message: 'Zod Validation Error',
    errorMessages: errors,
  }
}

export default handleZodValidationError
