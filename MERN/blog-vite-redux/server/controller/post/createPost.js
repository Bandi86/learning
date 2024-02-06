import { errorHandler } from "../../utils/error.js"

const createPost = async (req, res, next) => {
  if (!req.body.isAdmin)
    return next(errorHandler(403, 'not authorized'))

  if (!req.body.title || !req.body.content)
    return next(errorHandler(400, 'title or content is required'))
  
  const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-')
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user._id,
  })
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    next(error)
  }
}

export default createPost
