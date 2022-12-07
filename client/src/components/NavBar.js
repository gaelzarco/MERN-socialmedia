import { Link } from "react-router-dom"
import { MdPanoramaPhotosphereSelect } from "react-icons/md"
import { useStateContext } from "../context/StateContext"

export default function NavBar() {
    const { auth, logout } = useStateContext()

    return (
        <span className="nav">
            <div className="logo">
             <Link to='/'><MdPanoramaPhotosphereSelect size="40px" /></Link>
            </div>

            <ul className="nav-item-container">
                {auth ? (
                    <>
                        <li className="nav-item"><Link to='/'>Feed</Link></li>
                        <li className="nav-item" onClick={logout}>Logout</li>
                    </>
                ) : (
                    <li className="nav-item"><Link to="/login">Login</Link></li>
                )}
            </ul>
        </span>
    )
}