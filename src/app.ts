import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { RootRoutes } from './app/routes'

//root Application
const app: Application = express()

//middleware
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
])
app.use(cors())

// app.use(express.urlencoded({ extended: true }))
// application route
app.use('/api/v1', RootRoutes)
// test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ success: true, message: 'server is run.......' })
})
// Global Error Handler
app.use(globalErrorHandler)

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
  })
  next()
})

export default app
