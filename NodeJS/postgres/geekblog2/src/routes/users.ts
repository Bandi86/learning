import express from "express"
import getAllUsers from "../controllers/users/getAllUser.ts"
import getOneUser from "../controllers/users/getUserById.ts"
import createUser from "../controllers/users/createUser.ts"
import updateuser from "../controllers/users/updateUser.ts"
import deleteuser from "../controllers/users/deleteUser.ts"

const router = express()

router.get('/users', getAllUsers)
router.get('/users/:id', getOneUser)
router.post('/users', createUser)
router.put('/users/:id', updateuser)
router.delete('/users/:id', deleteuser)

export default router