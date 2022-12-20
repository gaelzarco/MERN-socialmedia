import { Link } from "react-router-dom"
import { GoOctoface, GoKebabHorizontal, GoHome } from "react-icons/go"
import { useStateContext } from "../context/StateContext"

export default function NavBar() {
    const { auth, logout } = useStateContext()

    return (
        <span className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                <Link to='/'><GoOctoface size="40px"/></Link>
                </div>

                    {auth ? (
                        <Link to='/'>
                            <button className="nav-item-btn">
                                <GoHome size="40px"/> <span>Home</span>
                            </button>
                        </Link>
                    ) : (
                        <Link to='/'>
                            <button className="nav-item-btn">
                                Explore
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