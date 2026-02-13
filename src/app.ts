import globalErrorHandler from '#middlewares/globalErrorHandler.js'
import { middleware } from '#middlewares/middleware.js'
import notFound from '#middlewares/notFound.js'
import router from '#modules/expense/expense.routes.js'
import cors from 'cors'
import express, { Application } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app: Application = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors())
app.use(express.static(path.join(__dirname, '../', 'public')))
app.get('/', middleware)
app.use('/api/v1', router)

// error handler

app.use(notFound)
app.use(globalErrorHandler)
export default app
