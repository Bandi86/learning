import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db/connect.js'
import postRouter from './routes/post.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/auth', authRouter)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message =
    err.message || 'Internal Server Error'
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

const start = async () => {
  try {
    await db()
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT}.`
      )
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

start()
