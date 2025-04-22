import CarLogo from "../assets/CarLogo.svg"
import MenuIcon from "../assets/MenuIcon.svg"

const Navbar = () => {
    
    return (
        <nav className="w-full h-17 fixed top-0 left-0 bg-black px-2 border-b border-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src={CarLogo} alt="Car Logo"/>
                    <h1 className="text-white text-2xl font-bold">
                        Maintenance book
                    </h1>  
                </div>
                
                <img src={MenuIcon} alt="Menu Icon" className="" />
            </div>
        </nav>
    )
}

export default Navbar