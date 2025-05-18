import express from 'express'
import Vehicle from '../models/Vehicle'

const router: express.Router = express.Router()

router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
    res.json(vehicles)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles' })
  }
})

router.post('/', async (req, res) => {
  const { register, brand, model, year, mileage, ownerId } = req.body

  if (!register || !brand || !model || !year || !mileage || !ownerId) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const newVehicle = new Vehicle({
      register,
      brand,
      model,
      year,
      mileage,
      ownerId,
      maintenanceLog: []
    })

    const savedVehicle = await newVehicle.save()
    res.status(201).json(savedVehicle)
  } catch (err) {
    res.status(500).json({ message: 'Error saving vehicle' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedVehicle = await Vehicle.findByIdAndDelete(id)

    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' })
    }

    res.status(200).json({ message: 'Vehicle deleted' })
  } catch (err) {
    console.error('Error deleting vehicle:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router