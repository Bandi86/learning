import jwt from 'jsonwebtoken'

const generateToken = (res, _id) => {
  const token = jwt.sign(
    { _id },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )

  res.cookie('jwt', token, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 60 * 24 * 60 * 1000,
  })
}

export default generateToken
