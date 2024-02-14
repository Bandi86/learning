import User from '../../model/user.model.js'

const getAllUser = async (req, res, next) => {
  // check user
  if (!req.user.isAdmin)
    return res.status(403).json({ message: 'You are not allowed to see all users!' })
  try {
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1
    const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit)
    const userWithoutPassword = users.map((user) => {
      const { password, ...others } = user._doc
      return others
    })
    const totalUsers = await User.countDocuments()
    const now = new Date()
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    })
    res.status(200).json({
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers
    })
  } catch (error) {
    next(error)
  }
}

export default getAllUser
