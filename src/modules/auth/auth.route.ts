import { authMiddleware } from '#middlewares/auth.middleware.js'
import { createUser, getAllUser, getProfile, login, logout } from '#modules/auth/auth.controller.js'
import { Router } from 'express'

const router = Router()

router.route('/register').post(createUser)
router.route('/logout').post(logout)
router.route('/login').post(login).get(getAllUser)
router.route('/profile').get(authMiddleware, getProfile)

const AuthRoutes = router
export default AuthRoutes
