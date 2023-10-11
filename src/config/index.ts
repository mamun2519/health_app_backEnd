import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })
export const env_config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  saltRounds: process.env.SALT_ROUND,
  jwt: {
    secret_token: process.env.SECRET_TOKEN,
    expire_in: process.env.SECRET_EXPIRE_IN,
    refresh_token: process.env.REFRESH_TOKEN,
    refresh_expire_in: process.env.REFRESH_EXPIRE_IN,
  },
}
