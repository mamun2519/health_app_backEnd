import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { RootRoutes } from './app/routes'
import axios from 'axios'
import { client } from './server'
//root Application----
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
// Social Media route
// app.use('/api/v1/bloodMedia', BloodMediaRoutes)
// test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'server is run.......' })
})
// Global Error Handler
app.use(globalErrorHandler)
//* test caching
app.get(
  '/test-caching',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cachingData = await client.get('post')
      if (cachingData) {
        res.status(200).json({
          success: true,
          message: 'data get for redis server caching',
          data: cachingData,
        })
      }

      const result = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
      )

      await client.set('post', result.data)
      console.log(result.data)
      res.status(200).json({
        success: true,
        message: 'data get for json json placeholder server',
        data: result.data,
      })
    } catch (err) {
      next(err)
    }
  },
)
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
