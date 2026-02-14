import globalErrorHandler from '#middlewares/globalErrorHandler.js'
import { middleware } from '#middlewares/middleware.js'
import notFound from '#middlewares/notFound.js'
import router from '#modules/expense/expense.routes.js'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import path from 'path'

const app: Application = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.static(path.join(process.cwd(), '../', 'public')))
app.get('/', middleware)

// router
app.use('/api/v1', router)

// error handler

app.use(notFound)
app.use(globalErrorHandler)
export default app
