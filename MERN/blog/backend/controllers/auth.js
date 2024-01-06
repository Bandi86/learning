import bcrypt from 'bcrypt'
import User from '../models/user.js'

import {
  formatDataSend,
  generateUsername,
  userValidation,
} from '../utils/auth.js'

// REGISTER USER
export const signUp = async (req, res) => {
  const { fullname, email, password } = req.body

  try {
    // Validate user input
    await userValidation(fullname, email, password, res)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate username (assuming generateUsername is defined somewhere)
    const username = await generateUsername(email)

    // Save the user to the database
    const user = await User.create({
      personal_info: {
        fullname,
        email,
        password: hashedPassword,
        username,
      },
    })

    if (user) console.log('user created', user)

    // Pass user object to formatDataSend function
    return res
      .status(200)
      .json({ message: 'Signup successful', user: formatDataSend(user, res) })
  } catch (error) {
    if (error.code === 11000)
      return res.status(500).json({ message: 'Email already exists' })
    console.log(`Error: ${error.message}`)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// LOGIN USER
export const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' })
    }

    // Check if email is in database and password is correct
    User.findOne({ 'personal_info.email': email }).then((user) => {
      if (!user) return res.status(400).json({ message: 'User does not exist' })

      // Validate password
      bcrypt.compare(password, user.personal_info.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' })
        } else {
          console.log('login successful', user)
          return res.status(200).json({
            message: 'Login successful',
            user: formatDataSend(user, res),
          })
        }
      })
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
