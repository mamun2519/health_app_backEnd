import { NextFunction, Request, Response } from 'express'
import Send_API_Error from '../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { jwtHelper } from '../../helper/jwtHelper'
import { env_config } from '../../config'
import { Secret } from 'jsonwebtoken'

export const auth =
  (...userRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.headers.authorization)
      const token = req.headers.authorization
      if (!token) {
        throw new Send_API_Error(
          StatusCodes.UNAUTHORIZED,
          'You are not authorized',
        )
      }
      let verifiedUser = null
      verifiedUser = jwtHelper.verifyToken(
        token,
        env_config.jwt.secret_token as Secret,
      )
      req.user = verifiedUser

      if (!userRole.includes(verifiedUser.role)) {
        throw new Send_API_Error(StatusCodes.FORBIDDEN, 'Forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
