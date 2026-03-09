import { createUser, getAllUser } from '#modules/users/users.controller.js'
import { Router } from 'express'

const router = Router()

router.route('/user').post(createUser).get(getAllUser)

const UserRoutes = router
export default UserRoutes
