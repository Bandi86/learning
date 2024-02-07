import express from 'express'
import getAllUser from '../controller/user/getAllUser.js'
import getUserById from '../controller/user/getUserById.js'
import updateUser from '../controller/user/updateUser.js'
import deleteUser from '../controller/user/deleteUser.js'
import { } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getUserById)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
