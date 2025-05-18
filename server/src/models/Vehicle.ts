import { Schema, model } from 'mongoose'

const vehicleSchema = new Schema({
  register: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  mileage: { type: String, required: true },
  maintenanceLog: [
    {
      type: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String, required: true },
      mileage: { type: String, required: true }
    }
  ],
  ownerId: { type: String, required: true }
})

const Vehicle = model('Vehicle', vehicleSchema)
export default Vehicle