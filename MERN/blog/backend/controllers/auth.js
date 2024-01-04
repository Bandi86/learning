import bcrypt from 'bcrypt'
import User from '../models/user.js'

// REGISTER USER
export const signUp = async (req, res) => {
  const { fullname, email, password } = req.body
  

  try {
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save the user to the database
    // Replace this with your actual database logic
    // For example:
    const user = await User.create({
      personal_info: { fullname, email, password: hashedPassword },
    })

    if (user) console.log('user created', user)
    return res
      .status(200)
      .json({ message: 'Signup successful', data: { fullname, email } })
  } catch (error) {
    if (error.code === 11000) return res.status(500).json({ message: 'Email already exists' })
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
    // Check if email is in database
  } catch (error) {}
}
