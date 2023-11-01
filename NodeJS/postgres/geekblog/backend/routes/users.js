import express from "express"
import getAllUsers from "../controller/users/getusers"
import getOneUser from "../controller/users/getoneuser.js"
import createUser from "../controller/users/createuser.js"
import updateuser from "../controller/users/updateuser.js"
import deleteuser from "../controller/users/deleteuser.js"

const router = express()

router.get('/users', getAllUsers)
router.get('/users/:id', getOneUser)
router.post('/users', createUser)
router.put('/users/:id', updateuser)
router.delete('/users/:id', deleteuser)

export default router