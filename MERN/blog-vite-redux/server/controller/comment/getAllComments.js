import Comment from '../../model/comment.model.js'
import { errorHandler } from '../../utils/error.js'

const getAllComments = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) return next(errorHandler(403, 'not allowed to get all comments'))
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.sort === 'desc' ? -1 : 1
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
    const totalComments = await Comment.countDocuments()
    const now = new Date()
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    })
    res.status(200).json({ comments, totalComments, lastMonthComments })
  } catch (error) {
    next(error)
  }
}

export default getAllComments
