import AuthRoutes from '#modules/auth/auth.route.js'
import ExpenseRoutes from '#modules/expense/expense.routes.js'
import { Router } from 'express'

const router = Router()

const moduleRoutes = [
    {
        path: '/expense',
        route: ExpenseRoutes
    },
    {
        path: '/user',
        route: AuthRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router
