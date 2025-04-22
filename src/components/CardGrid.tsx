import { useState } from "react"
import VehicleCard from "./VehicleCard"
import AddCard from "./AddCard"
import AddVehicleModal from "./AddVehicleModal"

type Vehicle = {
    id: number
    register: string
    brand: string
    model: string
    year: string
}

const CardGrid = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([
        {id: 1, brand: "Porsche", model: "911 Carrera Coupé", register: "QQQ-911", year: "2011"},
        {id: 2, brand: "Ford", model: "Focus", register: "ABC-123", year: "2020"},
        {id: 3, brand: "Kia", model: "Ceed", register: "ABC-111", year: "2024"}
    ])

    const [isModalOpen, setModalOpen] = useState(false)

    const handleModalOpen = () => {
      setModalOpen(true)
    }

    const handleModalClose = () => {
      setModalOpen(false)
    }

    const handleSaveVehicle = (formData: { register: string; brand: string; model: string, year: string}) => {
      const newVehicle: Vehicle = {
        id: Date.now(),
        register: formData.register,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
      };
      setVehicles(prev => [...prev, newVehicle])
      setModalOpen(false)
    }

return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 mt-4">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
        <AddCard onAdd={handleModalOpen} />
      </div>
      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveVehicle}
      />
    </>
  )
}

export default CardGrid