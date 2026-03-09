import ExpenseRoutes from '#modules/expense/expense.routes.js'
import UserRoutes from '#modules/users/users.route.js'
import { Router } from 'express'

const router = Router()

const moduleRoutes = [
    {
        path: '/expense',
        route: ExpenseRoutes
    },
    {
        path: '/user',
        route: UserRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router
