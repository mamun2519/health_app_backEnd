import app from './app'
import { env_config } from './config'

import http from 'http'

const server: http.Server = http.createServer(app)

async function bootstrap() {
  // const server: Server = app.listen(env_config.port, () =>
  //   console.log(`server running on post ${env_config.port}`),
  // )

  server.listen(env_config.port, () =>
    console.log(`server running on post ${env_config.port}`),
  )

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
