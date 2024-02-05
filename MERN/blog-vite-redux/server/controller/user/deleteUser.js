import User from '../../model/user.model.js'

const deleteUser = async (req, res, next) => {
  // check the id the param and the id of the user
  if (req.user._id !== req.params.id)
    return next(errorHandler(403, 'Not allowed to delete user'))
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted')
  } catch (error) {
    next(error)
  }
}

export default deleteUser
