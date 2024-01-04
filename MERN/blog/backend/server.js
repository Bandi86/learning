import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './db/config.js'
import authRoutes from './routes/auth.js'
import bodyParser from 'body-parser'


const app = express()

dotenv.config()

const PORT = process.env.PORT

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', authRoutes)
 

const start = async () => {
  try {
    await db()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

start()
