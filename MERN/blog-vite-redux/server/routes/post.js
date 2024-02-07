import express from 'express'
import getAllPost from '../controller/post/getAllPost.js'
import getPostById from '../controller/post/getPostById.js'
import createPost from '../controller/post/createPost.js'
import updatePost from '../controller/post/updatePost.js'
import deletePost from '../controller/post/deletePost.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/', getAllPost)
router.get('/:postId', getPostById)
router.post('/', verifyUser, createPost)
router.put('/:postId/:userId', verifyUser, updatePost)
router.delete('/:postId/:userId', verifyUser, deletePost)

export default router
