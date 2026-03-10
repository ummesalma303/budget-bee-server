import { createUser, getAllUser } from '#modules/auth/auth.controller.js'
import { Router } from 'express'

const router = Router()

router.route('/user').post(createUser).get(getAllUser)

const AuthRoutes = router
export default AuthRoutes
