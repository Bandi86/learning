import User from '../../model/user.model.js'
import { errorHandler } from '../../utils/error.js'

const userById = async (req, res, next) => {
  const { userId } = req.params

  let _id = userId
  try {
    if (!userId) {
      return next(errorHandler(404, 'provide a valid user id'))
    }
    const user = await User.findById(_id)
    if (!user) {
      return next(errorHandler(404, 'user not found'))
    }
    const { password, ...responseUser } = user._doc
    res.status(200).json({ user: responseUser })
  } catch (error) {
    next(error)
  }
}

export default userById
