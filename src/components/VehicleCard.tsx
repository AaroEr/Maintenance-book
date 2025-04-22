type Vehicle = {
    id: number
    register: string
    brand: string
    model: string
    year: string
}

type Props = {
    vehicle: Vehicle
}

const VehicleCard = ({ vehicle }: Props ) => {
    return (
        <div className="bg-white rounded-xl p-4 w-full">
            <h2 className="text-lg font-semibold">{vehicle.brand}</h2>
            <p>{vehicle.model}</p>
            <p>{vehicle.register}</p>
            <p>{vehicle.year}</p>
        </div>
    )
}

export default VehicleCard