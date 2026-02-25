import { createUser } from '#modules/users/users.controller.js'
import { Router } from 'express'

import { getExpenses } from './expense.controller.js'

const router = Router()

router.route('/expense').get(getExpenses)
router.route('/user').post(createUser)

const ExpenseRoutes = router
export default ExpenseRoutes
