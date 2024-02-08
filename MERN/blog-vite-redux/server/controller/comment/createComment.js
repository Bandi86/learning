import { errorHandler } from '../../utils/error.js'
import Comment from '../../model/comment.model.js'

const createComment = async (req, res, next) => {
  const { content, userId, postId } = req.body

  try {
    if (!content || !postId || !userId) {
      return next(errorHandler(400, 'Invalid input. Please provide all required fields.'))
    }

    if (userId !== req.user._id) {
      return next(errorHandler(401, 'Unauthorized'))
    }

    const newComment = new Comment({
      content,
      postId,
      userId
    })
    await newComment.save()
    res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
}

export default createComment
