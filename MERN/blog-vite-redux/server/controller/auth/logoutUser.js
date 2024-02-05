const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('jwt')

    res.status(200).json('Logged out')
  } catch (error) {
    next(error)
  }
}

export default logoutUser
