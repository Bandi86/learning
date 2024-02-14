import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import getAllComments from '../controller/comment/getAllComments.js'
import getCommentById from '../controller/comment/getCommentById.js'
import createComment from '../controller/comment/createComment.js'
import updateComment from '../controller/comment/updateComment.js'
import deleteComment from '../controller/comment/deleteComment.js'
import likeComment from '..controller/comment/likeComment.js'

const router = express.Router()

router.get('/', verifyUser, getAllComments)
router.get('/:postId', getCommentById)
router.post('/', verifyUser, createComment)
router.put('/likeComment/:commentId', verifyUser, likeComment)
router.put('/:commentId', verifyUser, updateComment)
router.delete('/:commentId', verifyUser, deleteComment)

export default router
