import { useStateContext } from "../context/StateContext"

import { Link } from "react-router-dom"

import { GoOctoface, GoKebabHorizontal, GoHome } from "react-icons/go"
import { FaSlackHash } from "react-icons/fa"

export default function NavBar() {
    const { auth, logout } = useStateContext()

    return (
        <span className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                <Link to='/'><GoOctoface size="30px"/></Link>
                </div>

                    {auth ? (
                        <Link to='/'>
                            <button className="nav-item-btn">
                                <GoHome size="30px"/> <span>Home</span>
                            </button>
                        </Link>
                    ) : (
                        <Link to='/'>
                            <button className="nav-item-btn">
                                <FaSlackHash size="30px"/> <span>Explore</span>
                            </button>
                        </Link>
                    )}

                {auth && (
                    <footer className="nav-footer">
                        <div className="nav-user">
                            <img  className="nav-user-img" src={auth.user.img} alt="Profile"/>
                            <div className="nav-user-name-container">
                                <p className="nav-user-name">{auth.user.firstName} {auth.user.lastName}</p>
                                <p className="nav-user-username">@{auth.user.userName}</p>
                            </div>
                            <GoKebabHorizontal size='20px'/>
                        </div>
                    </footer>
                )}
            </div>
        </span>
    )
}