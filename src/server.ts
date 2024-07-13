import app from './app'
import { env_config } from './config'
import http from 'http'
const server: http.Server = http.createServer(app)
import { createClient } from 'redis'
//* connect to redis for cashing
export const client = createClient()

//handle success message
client.on('connect', () => {
  console.log('Connected to Redis')
})

// handle error message
client.on('error', err => {
  console.log('Redis error: ', err)
})
async function bootstrap() {
  // const server: Server = app.listen(env_config.port, () =>
  //   console.log(`server running on post ${env_config.port}`),
  // )

  server.listen(env_config.port, () =>
    console.log(`server running on post ${env_config.port}`),
  )

  //* connect to redis server
  await client.connect()
  const existHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server Closed')
      })
      process.exit(1)
    }
  }
  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error)
    existHandler()
  }

  process.on('uncaughtException', unexpectedErrorHandler)
  process.on('unhandledRejection', unexpectedErrorHandler)
  // process.on('SIGTERM', () => {
  //   console.log('SIGTERM received')
  //   if (server) {
  //     server.close()
  //   }
  // })
}

bootstrap()
