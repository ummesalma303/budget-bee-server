import { Router } from 'express'

import { getExpenses } from './expense.controller.js'

const router = Router()

router.route('/expense').get(getExpenses)
export default router
