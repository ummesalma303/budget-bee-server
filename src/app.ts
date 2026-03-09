import globalErrorHandler from '#middlewares/globalErrorHandler.js'
import { middleware } from '#middlewares/middleware.js'
import notFound from '#middlewares/notFound.js'
import rateLimitMiddleware from '#middlewares/rateLimitMiddleware.js'
import router from '#modules/expense/expense.routes.js'
import UserRoutes from '#modules/users/users.route.js'
import logger from '#utils/logger.js'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

const app: Application = express()

// Middleware setup
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(express.static(path.join(process.cwd(), '../', 'public')))
app.get('/', middleware)

// morgan setup to use winston for logging HTTP requests
app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    })
)

// Rate limit middleware
app.use(rateLimitMiddleware)

// Router setup
app.use('/api/v1', router)
app.use('/api/v1', UserRoutes)
// Error handler
app.use(notFound)
app.use(globalErrorHandler)
export default app
