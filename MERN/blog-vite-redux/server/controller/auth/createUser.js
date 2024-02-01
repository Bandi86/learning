import User from '../../model/user.model.js'
import bcrypt from 'bcrypt'
import { errorHandler } from '../../utils/error.js'

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body

  let realPassword = password

  try {
    // if no username, email or password
    if (!username || !email || !realPassword) {
      next(
        errorHandler(
          400,
          'Please fill all fields.'
        )
      )
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(
      realPassword,
      salt
    )

    const password = hashedPassword

    const user = await User.create({
      username,
      email,
      password,
    })

    const sendBackData = {
      username: user.username,
      email: user.email,
      id: user._id,
    }

    res
      .status(201)
      .json({
        message: 'User created',
        user: sendBackData,
      })
    console.log(user, 'user created')
  } catch (error) {
    next(error)
  }
}

export default createUser
