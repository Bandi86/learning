import User from '../../model/user.model.js'

const getAllUser = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({ users })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

export default getAllUser
