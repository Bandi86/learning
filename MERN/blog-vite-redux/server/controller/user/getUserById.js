import User from '../../model/user.model.js'

const userById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    res.status(200).json({ user })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

export default userById
