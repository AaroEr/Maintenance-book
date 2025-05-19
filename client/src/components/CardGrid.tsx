import { useState, useEffect } from "react"
import { auth } from "../firebase"
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
    _id: string
    register: string
    brand: string
    model: string
    year: string
    mileage: string
    maintenanceLog?: MaintenanceEntry[]
    ownerId: string
}

const CardGrid = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])


    const [isModalOpen, setModalOpen] = useState(false)
    const [isViewModalOpen, setViewModalOpen] = useState(false)
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)

    const currentUser = auth.currentUser

    useEffect(() => {
      const fetchVehicles = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/vehicles")
          const data = await res.json()
          setVehicles(data)
        } catch (error) {
          console.error("Failed to fetch vehicles", error)
        }
      }

      fetchVehicles()
    }, [])


    const visibleVehicles = vehicles.filter(v => v.ownerId === currentUser?.uid)


    const handleModalOpen = () => {
      setModalOpen(true)
    }

    const handleModalClose = () => {
      setModalOpen(false)
    }

    const handleSaveVehicle = async (formData: {
      register: string
      brand: string
      model: string
      year: string
      mileage: string
    }) => {
      const currentUser = auth.currentUser
      if (!currentUser) return

      const vehicleData = {
        ...formData,
        ownerId: currentUser.uid,
      }

      try {
        const response = await fetch('http://localhost:5000/api/vehicles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vehicleData),
        })

        if (!response.ok) {
          throw new Error('Failed to save vehicle')
        }

        const savedVehicle = await response.json()
        setVehicles((prev) => [...prev, savedVehicle])
        setModalOpen(false)
      } catch (error) {
        console.error('Error saving vehicle:', error)
        alert('Error saving vehicle')
      }
    }

    const handleViewVehicle = (vehicle: Vehicle) => {
      setSelectedVehicleId(vehicle._id)
      setViewModalOpen(true)
    }    

    const handleCloseViewModal = () => {
      setSelectedVehicleId(null)
      setViewModalOpen(false)
    }    

    const handleDeleteVehicle = async (_id: string) => {
      const confirmed = window.confirm("Are you sure you want to delete this vehicle and all associated data and logs?")
      if (!confirmed) return

      try {
        const response = await fetch(`http://localhost:5000/api/vehicles/${_id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete vehicle')
        }

        setVehicles(prev => prev.filter(v => v._id !== _id))
        setViewModalOpen(false)
      } catch (error) {
        console.error("Error deleting vehicle:", error)
        alert("Error deleting vehicle")
      }
    }

    const handleAddMaintenance = async (vehicleId: string, entry: MaintenanceEntry) => {
      try {
        const response = await fetch(`http://localhost:5000/api/vehicles/${vehicleId}/maintenance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(entry)
        })

        if (!response.ok) {
          throw new Error("Failed to add maintenance entry")
        }

        const updatedVehicle = await response.json()

        setVehicles((prev) =>
          prev.map((v) => (v._id === vehicleId ? updatedVehicle : v))
        )
      } catch (error) {
        console.error("Error adding maintenance:", error)
        alert("Error adding maintenance")
      }
    }

return (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 mt-4">
      {visibleVehicles.map(vehicle => (
        <VehicleCard
          key={vehicle._id}
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
    vehicle={vehicles.find(v => v._id === selectedVehicleId)!}
  />
)}
  </>
  )
}

export default CardGrid