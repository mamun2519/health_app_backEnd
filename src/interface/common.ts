// import { IErrorMessage } from './error'

import { IErrorMessage } from './error'

export type IErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IErrorMessage[]
}

export type IAuthUser = {
  user_id: string
  role: string
}
