import Comment from '../../model/comment.model.js'
import { errorHandler } from '../../utils/error.js'

const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
    if (!comment) return next(errorHandler(404, 'comment not found'))
    const userIndex = comment.likes.indexOf(req.user.id)
    if (userIndex === -1) {
      comment.numberOfLikes += 1
      comment.likes.push(req.user.id)
    } else {
      comment.numberOfLikes -= 1
      comment.likes.splice(userIndex, 1)
    }
    await comment.save()
    res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}

export default likeComment
