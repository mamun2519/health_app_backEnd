import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
const tokenGenerate = (
  data: Record<string, unknown>,
  secret: Secret,
  expire_in: string,
): string => {
  const token = jwt.sign(data, secret, { expiresIn: expire_in })
  return token
}

//* verify token
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const jwtHelper = {
  tokenGenerate,
  verifyToken,
}
