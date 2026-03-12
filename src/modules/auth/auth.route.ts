import { createUser, getAllUser, login } from '#modules/auth/auth.controller.js'
import { Router } from 'express'

const router = Router()

router.route('/user').post(createUser).post(login).get(getAllUser)

const AuthRoutes = router
export default AuthRoutes
