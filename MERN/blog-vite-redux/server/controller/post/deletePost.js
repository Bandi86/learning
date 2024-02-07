import Post from '../../model/post.model.js'
import { errorHandler } from '../../utils/error.js'

const deletePost = async (req, res, next) => {
  const { postId, userId } = req.params
  // check the user id and post id is not empty
  if (!postId || !userId) {
    return res.status(400).json({ message: 'Invalid request' })
  }
  // validate the user if is admin or not
  if (!req.user.isAdmin || req.user.id !== userId) {
    return next(
      errorHandler(403, 'You are not allowed to delete this post')
    )
  }

  try {
    await Post.findByIdAndDelete(postId)
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export default deletePost
