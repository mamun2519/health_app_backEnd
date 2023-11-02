'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const cors_1 = __importDefault(require('cors'))
const cookie_parser_1 = __importDefault(require('cookie-parser'))
const globalErrorHandler_1 = __importDefault(
  require('./app/middleware/globalErrorHandler'),
)
const routes_1 = require('./app/routes')
//root Application
const app = (0, express_1.default)()
//middleware
app.use([
  (0, cors_1.default)(),
  express_1.default.json(),
  express_1.default.urlencoded({ extended: true }),
  (0, cookie_parser_1.default)(),
])
// app.use(express.urlencoded({ extended: true }))
// application route
app.use('/api/v1', routes_1.RootRoutes)
// test route
app.get('/', (req, res) => {
  res.status(200).send({ success: true, message: 'server is run.......' })
})
// Global Error Handler
app.use(globalErrorHandler_1.default)
// handle not found route
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
  })
  next()
})
exports.default = app
