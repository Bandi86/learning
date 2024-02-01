import User from '../../model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../../utils/error.js'

const loginUser = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(
      errorHandler(400, 'Please fill all fields.')
    )
  }
  try {
    // check if user exists
    const user = await User.findOne({
      email,
    })

    if (!user) {
      return next(
        errorHandler(
          404,
          'Email or password is wrong.'
        )
      )
    }

    // check if user already have token
    if (req.cookies.token) {
      return next(
        errorHandler(
          400,
          'User already logged in.'
        )
      )
    }

    // compare the password
    const validPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!validPassword) {
      return next(
        errorHandler(
          404,
          'Email or password is wrong.'
        )
      )
    }

    // create token for user
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    )

    // send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
    })

    // send response
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default loginUser
