import Post from '../../model/post.model.js'

const updatePost = async (req, res, next) => {
  const { postId, userId } = req.params
  // check the user id and post id is not empty
  if (!postId || !userId) {
    return res.status(400).json({ message: 'Invalid request' })
  }
  // validate the user if is admin or not
  if (!req.user.isAdmin || req.user.id !== userId) {
    return next(
      errorHandler(403, 'You are not allowed to update this post')
    )
  }
  try {
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    )
    res.status(200).json(updatePost)
  } catch (error) {
    next(error)
  }
}

export default updatePost
