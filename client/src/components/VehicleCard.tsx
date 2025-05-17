type Vehicle = {
    id: number
    register: string
    brand: string
    model: string
    year: string
    mileage: string
}

type Props = {
    vehicle: Vehicle
    onClick?: () => void
}

const VehicleCard = ({ vehicle, onClick }: Props ) => {
    return (
        <div 
        onClick={onClick}
        className="bg-white rounded-xl p-4 w-full cursor-pointer hover:bg-gray-300">
            <h2 className="text-lg font-semibold">{vehicle.brand}</h2>
            <p>{vehicle.model}</p>
            <p>{vehicle.register}</p>
            <p>{vehicle.year}</p>
            <p>{vehicle.mileage} km</p>
        </div>
    )
}

export default VehicleCard