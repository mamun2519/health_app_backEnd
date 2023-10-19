'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const app_1 = __importDefault(require('./app'))
const config_1 = require('./config')
function bootstrap() {
  return __awaiter(this, void 0, void 0, function* () {
    const server = app_1.default.listen(config_1.env_config.port, () =>
      console.log(`server running on post ${config_1.env_config.port}`),
    )
    const existHandler = () => {
      if (server) {
        server.close(() => {
          console.log('Server Closed')
        })
        process.exit(1)
      }
    }
    const unexpectedErrorHandler = error => {
      console.log(error)
      existHandler()
    }
    process.on('uncaughtException', unexpectedErrorHandler)
    process.on('unhandledRejection', unexpectedErrorHandler)
    process.on('SIGTERM', () => {
      console.log('SIGTERM received')
      if (server) {
        server.close()
      }
    })
  })
}
bootstrap()
