import User from '../../model/user.model.js'
import bcrypt from 'bcrypt'

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body

  let realPassword = password

  try {
    // if no username, email or password
    if (!username || !email || !realPassword) {
      return res
        .status(400)
        .json({ msg: 'Please enter all fields' })
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

    res.status(201).json({ user })
    console.log(user, 'user created')
  } catch (error) {
    next(error)
  }
}

export default createUser
