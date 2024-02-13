import Comment from '../../model/comment.model.js'
import { errorHandler } from '../../utils/error.js'

const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
    if (!comment) return next(errorHandler(404, 'comment not found'))
    if (comment.userId === req.user.id && !req.user.isAdmin)
      return next(errorHandler(403, 'you cant edit comment'))
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    )
    res.status(200).json(editedComment)
  } catch (error) {
    next(error)
  }
}

export default updateComment
