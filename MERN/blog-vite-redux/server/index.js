import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

dotenv.config()
app.use(cors())

app.listen(8000, () => {
  console.log(
    'Server is listening on port 5000...'
  )
})
