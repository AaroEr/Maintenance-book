import { useState } from "react"
import VehicleCard from "./VehicleCard"
import AddCard from "./AddCard"
import AddVehicleModal from "./AddVehicleModal"
import ViewVehicleModal from "./ViewVehicleModal"

type MaintenanceEntry = {
  id: number
  type: string
  description: string
  date: string
  mileage: string
}

type Vehicle = {
    id: number
    register: string
    brand: string
    model: string
    year: string
    mileage: string
    maintenanceLog?: MaintenanceEntry[]
}

const CardGrid = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([
        {id: 1, brand: "Porsche", model: "911 Carrera Coupé", register: "QQQ-911", year: "2011", mileage: "90 000"},
        {id: 2, brand: "Ford", model: "Focus", register: "ABC-123", year: "2020", mileage: "200 000"},
        {id: 3, brand: "Kia", model: "Ceed", register: "ABC-111", year: "2024", mileage: "120 000"}
    ])

    const [isModalOpen, setModalOpen] = useState(false)
    const [isViewModalOpen, setViewModalOpen] = useState(false)
    const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null)


    const handleModalOpen = () => {
      setModalOpen(true)
    }

    const handleModalClose = () => {
      setModalOpen(false)
    }

    const handleSaveVehicle = (formData: { register: string; brand: string; model: string, year: string, mileage: string}) => {
      const newVehicle: Vehicle = {
        id: Date.now(),
        register: formData.register,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        mileage: formData.mileage,
      };
      setVehicles(prev => [...prev, newVehicle])
      setModalOpen(false)
    }

    const handleViewVehicle = (vehicle: Vehicle) => {
      setSelectedVehicleId(vehicle.id)
      setViewModalOpen(true)
    }    

    const handleCloseViewModal = () => {
      setSelectedVehicleId(null)
      setViewModalOpen(false)
    }    

    const handleDeleteVehicle = (id: number) => {
      const confirmed = window.confirm("Are you sure you want to delete this vehicle and all associated data and logs?")
      if (!confirmed) return
      setVehicles(prev => prev.filter(v => v.id !== id))
      setViewModalOpen(false)
    }

    const handleAddMaintenance = (vehicleId: number, entry: MaintenanceEntry, newMileage: string) => {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === vehicleId
            ? {
                ...v,
                mileage: newMileage,
                maintenanceLog: [...(v.maintenanceLog || []), entry],
              }
            : v
        )
      )
    }

return (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 mt-4">
      {vehicles.map(vehicle => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onClick={() => handleViewVehicle(vehicle)}
        />
      ))}
      <AddCard onAdd={handleModalOpen} />
    </div>

    <AddVehicleModal
      isOpen={isModalOpen}
      onClose={handleModalClose}
      onSave={handleSaveVehicle}
    />

{selectedVehicleId !== null && (
  <ViewVehicleModal
    isOpen={isViewModalOpen}
    onClose={handleCloseViewModal}
    onDelete={handleDeleteVehicle}
    onAddMaintenance={handleAddMaintenance}
    vehicle={vehicles.find(v => v.id === selectedVehicleId)!}
  />
)}
  </>
  )
}

export default CardGrid