import { useState } from "react"

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
}

type ViewVehicleModalProps = {
    isOpen: boolean
    onClose: () => void
    onDelete: (_id: string) => void
    onAddMaintenance: (vehicleId: string, entry: MaintenanceEntry) => void
    vehicle: Vehicle
}

const ViewVehicleModal = ({ isOpen, onClose, onDelete, onAddMaintenance, vehicle }: ViewVehicleModalProps) => {
  const [isAdding, setIsAdding] = useState(false)
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [mileage, setMileage] = useState("")


    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const newEntry: MaintenanceEntry = {
        id: Date.now(),
        type,
        description,
        date: new Date().toLocaleDateString(),
        mileage,
      }
      onAddMaintenance(vehicle._id, newEntry)
      setType("")
      setDescription("")
      setMileage("")
      setIsAdding(false)
    }

    const resetMaintenanceForm = () => {
      setType("")
      setDescription("")
      setMileage("")
      setIsAdding(false)
    }
    
  
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-6xl h-[80%] overflow-y-auto relative">
            <button
            onClick={() => {
              resetMaintenanceForm()
              onClose()}}
            className="absolute top-2 right-4 text-gray-500 hover:text-black cursor-pointer">✕</button>
          <h2 className="text-xl font-semibold mb-4">Vehicle information</h2>
          <div className="space-y-2">
            <p><label className="text-l font-bold">Brand:</label> {vehicle.brand}</p>
            <p><label className="text-l font-bold">Model:</label> {vehicle.model}</p>
            <p><label className="text-l font-bold">License plate number:</label> {vehicle.register}</p>
            <p><label className="text-l font-bold">Model year:</label> {vehicle.year}</p>
            <p><label className="text-l font-bold">Mileage:</label> {vehicle.mileage} km</p>
          </div>

          <h3 className="text-xl font-semibold mt-6">Meintenance log</h3>

          {vehicle.maintenanceLog && vehicle.maintenanceLog.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {vehicle.maintenanceLog.map(entry => (
                <li key={entry.id} className="border rounded-md p-3 bg-gray-100">
                  <p className="text-sm text-gray-500">{entry.date}</p>
                  <p className="text-sm text-gray-500">Mileage: {entry.mileage} km</p>
                  <p className="font-semibold">{entry.type}</p>
                  <p className="text-sm">{entry.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No maintenance entries yet.</p>
          )}

          <button
            onClick={() => {
              if (isAdding) {
                setType("")
                setDescription("")
              }
              setIsAdding(!isAdding)}}
            className={`mt-6 text-white px-4 py-2 rounded-md ${isAdding ? 'bg-red-600 hover:bg-red-800' : 'bg-blue-600 hover:bg-blue-800'}`}>
            {isAdding ? "Cancel" : "Add maintenance"}
          </button>

          {isAdding && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Current mileage</label>
                <input
                  type="text"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter current mileage"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Type</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="e.g. Oil change"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Describe what was done"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit" className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
              >Save</button>
            </form>
          )}
          <div className="flex justify-end">
            <button
              onClick={() => onDelete(vehicle._id)}
              className="bg-red-600 hover:bg-red-800 cursor-pointer text-white px-4 py-2 rounded-md"
            >
              Delete vehicle
            </button>
          </div>
        </div>
      </div>
    )
  }
  
export default ViewVehicleModal