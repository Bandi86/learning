import Comment from '../../model/comment.model.js'
import { errorHandler } from '../../utils/error.js'

const getCommentById = async (req, res, next) => {
  const { postId } = req.params
  try {
    if (!postId) {
      return next(errorHandler(400, 'Invalid input. Please provide all required fields.'))
    }
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 })
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}

export default getCommentById
