import bcrypt from 'bcrypt'
import { errorHandler } from '../../utils/error.js'
import User from '../../model/user.model.js'

const updateUser = async (req, res, next) => {
  const saltRounds = 10

  if (req.user._id !== req.params.id) return next(errorHandler(403, 'Not allowed to update user'))
  if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, saltRounds)

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username must not contain spaces'))
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'))
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, 'Username must contain only letters and numbers'))
    }
  }
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...updateUser,
          ...req.body
        }
      },
      { new: true }
    )
    const sendBack = {
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture
    }
    console.log('Update Success', sendBack)
    res.status(200).json(sendBack)
  } catch (error) {
    next(error)
  }
}

export default updateUser
