import { Link } from "react-router-dom"
import { useStateContext } from "../context/StateContext"

export default function SideBar() {
    const { auth } = useStateContext()

    return (
        <div className="side-bar-container">
            <div className="side-bar">
                {auth ? (
                        <li className="side-bar-item">Placeholder</li>
                ) : (
                    <div className="side-bar-sign-up">
                        <h2>New to Social media?</h2>
                        <p>Sign-up and share your thoughts with the world!</p>
                        <div className="side-bar-btn-container">
                            <Link to='/create-account'><button className="side-bar-btn">Sign-Up with E-mail</button></Link>
                        </div>
                        <div className="side-bar-btn-container">
                            <Link to="/login"><button className="side-bar-btn">Login</button></Link>
                        </div>
                        <p>By signing up, you agree to the Terms Of Service and Privacy Policy, including Cookie Use.</p>
                    </div>
                )}
            </div>
        </div>
    )
}