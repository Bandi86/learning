import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const userValidation = (fullname, email, password, res) => {
  // Check if all fields are provided
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'Please fill all the fields' })
  }

  // Check if fullname is at least 3 characters long
  if (fullname.length < 3) {
    return res
      .status(400)
      .json({ message: 'Fullname must be at least 3 characters long' })
  }

  // Check if password is at least 6 characters long
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 6 characters long' })
  }

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  return true
}

export const generateUsername = async (email) => {
  const username = email.split('@')[0]
  const isUsernameTaken = await User.findOne({
    'personal_info.username': username,
  })
  if (isUsernameTaken) {
    const randomNum = Math.floor(Math.random() * 1000)
    return `${username}${randomNum}`
  }
  return username
}

export const formatDataSend = (user, res) => {
  const access_token = jwt.sign({ _id: user._id }, process.env.JWT)

  res.cookie('access_token', access_token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  })

  return {
    access_token,
    _id: user._id,
    fullname: user.personal_info.fullname,
    email: user.personal_info.email,
    username: user.personal_info.username,
    profile_img: user.personal_info.profile_img,
  }
}
