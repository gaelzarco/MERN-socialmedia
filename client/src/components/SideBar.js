import { Link } from "react-router-dom"
import { useStateContext } from "../context/StateContext"

export default function SideBar() {
    const { auth, logout } = useStateContext()

    return (
        <span className="side-bar">
            <h1>Side-bar</h1>

            <ul className="side-bar-item-container">
                {auth ? (
                        <li className="side-bar-item" onClick={logout}>Logout</li>
                ) : (
                    <li className="side-bar-item"><Link to="/login">Login</Link></li>
                )}
            </ul>
        </span>
    )
}