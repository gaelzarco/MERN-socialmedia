import { Link } from "react-router-dom"
import { GoOctoface, GoKebabHorizontal } from "react-icons/go"
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
                            <div className="nav-item-div">
                                <h4 className="nav-item">Home</h4>
                            </div>
                        </Link>
                    ) : (
                        <Link to='/'>
                            <div className="nav-item-div">
                                <h4 className="nav-item">Explore</h4>
                            </div>
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