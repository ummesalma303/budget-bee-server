import ExpenseRoutes from '#modules/expense/expense.routes.js'
import { Router } from 'express'

const router = Router()

const moduleRoutes = [
    {
        path: '/expense',
        route: ExpenseRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router
