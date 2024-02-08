import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    const error = errorHandler(401, 'Unauthorized')
    return next(error)
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = errorHandler(403, 'Forbidden')
      return next(error)
    }
    req.user = user

    next()
  })
}
