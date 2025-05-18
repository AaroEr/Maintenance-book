import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import vehicleRoutes from './routes/vehicleRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

app.use('/api/vehicles', vehicleRoutes)

app.get('/', (_req, res) => {
  res.send('Server is running')
})

if (!MONGO_URI) {
  console.error('MONGODB_URI missing from .env file')
  process.exit(1)
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })