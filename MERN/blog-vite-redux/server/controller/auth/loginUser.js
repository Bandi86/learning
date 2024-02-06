import User from '../../model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../../utils/error.js'
import generateToken from '../../utils/generateToken.js'

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
    if (req.cookies && req.cookies.token) {
      try {
        jwt.verify(
          req.cookies.token,
          process.env.JWT_SECRET
        )
        return next(
          errorHandler(
            400,
            'User already logged in.'
          )
        )
      } catch (error) {
        return next(
          errorHandler(401, 'Invalid token.')
        )
      }
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

    // generate token
    generateToken(res, user._id, user.isAdmin)

    // send response
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default loginUser
