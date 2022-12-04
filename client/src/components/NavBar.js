import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <div className="nav">
            <p className="logo">
                <Link to="/">MERN Social Media</Link>
            </p>

            <ul className="nav-item-container">
                <li className="nav-item"><Link to="/login">Login</Link></li>
            </ul>
        </div>
    )
}