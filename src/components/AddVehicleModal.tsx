import React, { useState } from "react"

type VehicleFormData = {
  register: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
}

type AddVehicleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: VehicleFormData) => void;
}

const AddVehicleModal = ({ isOpen, onClose, onSave }: AddVehicleModalProps) => {
  const [formData, setFormData] = useState<VehicleFormData>({
    register: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ register: "", brand: "", model: "", year: "", mileage: ""})
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Add new vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, brand: e.target.value }))
              }
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter vehicle brand"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, model: e.target.value }))
              }
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter the model of the vehicle"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Year</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, year: e.target.value }))
              }
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter the model year"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">License plate number</label>
            <input
              type="text"
              value={formData.register}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, register: e.target.value }))
              }
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter license plate number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mileage</label>
            <input
              type="text"
              value={formData.mileage}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, mileage: e.target.value }))
              }
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter mileage in km"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddVehicleModal