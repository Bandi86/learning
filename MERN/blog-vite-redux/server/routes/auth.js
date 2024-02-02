import express from 'express'
import createUser from '../controller/auth/createUser.js'
import loginUser from '../controller/auth/loginUser.js'
import logoutUser from '../controller/auth/logoutUser.js'
import google from '../controller/auth/google.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/google', google)
router.get('/logout', logoutUser)

export default router
