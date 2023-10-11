import { Response } from 'express'
type IApiResponse<T> = {
  statusCode: number
  success: boolean
  message: string | null
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
  data: T | null
}

const sendApiResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  }
  res.status(data.statusCode).json(responseData)
}
export default sendApiResponse
