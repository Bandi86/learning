import Comment from '../../model/comment.model.js'
import { errorHandler } from '../../utils/error.js'

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
    if (!comment) return next(errorHandler(404, 'comment not found'))
    if (comment.userId !== req.user.id && !req.user.isAdmin)
      return next(errorHandler(403, 'not allowed to delete comment'))
    await Comment.findByIdAndDelete(req.params.commentId)
    res.status(200).json('comment has been deleted')
  } catch (error) {
    next(error)
  }
}

export default deleteComment
