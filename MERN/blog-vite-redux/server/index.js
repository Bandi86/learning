import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import db from './db/connect.js'
import postRouter from './routes/post.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'

const app = express()

dotenv.config()
app.use(bodyParser.json())
app.use(cookieParser())
dotenv.config()

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

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
