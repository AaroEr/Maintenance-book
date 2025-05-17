import CarLogo from "../assets/CarLogo.svg"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

const Navbar = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUserEmail(user?.email ?? null)
        })
        return () => unsubscribe()
    }, [])

    const handleLogout = async () => {
        await signOut(auth)
        navigate("/login")
      }
    
    return (
        <nav className="w-full h-17 fixed top-0 left-0 bg-black px-2 border-b border-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src={CarLogo} alt="Car Logo"/>
                    <h1 className="text-white text-2xl font-bold">
                        Maintenance book
                    </h1>  
                </div>
                <div className="flex items-center px-2 space-x-4">
                    {userEmail && (
                        <>
                            <span className="text-white text-sm hidden sm:inline">{userEmail}</span>
                            <button
                                onClick={handleLogout}
                                className="text-white bg-red-600 hover:bg-red-800 px-4 py-1 rounded text-sm"
                            >Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar