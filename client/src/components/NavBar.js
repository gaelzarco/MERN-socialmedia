import { useState } from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../context/StateContext"

import { GoOctoface, GoKebabHorizontal, GoHome } from "react-icons/go"
import { CgProfile } from "react-icons/cg"
import { FaSlackHash } from "react-icons/fa"

export default function NavBar() {
    const { auth, logout } = useStateContext()

    const [ logoutDisplay, setLogoutDisplay ] = useState(false)

    return (
        <div className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                <Link to='/'><GoOctoface size="30px"/></Link>
                </div>

                    {auth ? (
                        <>
                            <Link to='/'>
                                <button className="nav-item-btn">
                                    <GoHome size="30px"/> <span>Home</span>
                                </button>
                            </Link>
                            <Link to='/profile'>
                                <button className="nav-item-btn">
                                    <CgProfile size="30px" /> <span>Profile</span>
                                </button>
                            </Link>
                        </>
                    ) : (
                        <Link to='/'>
                            <button className="nav-item-btn">
                                <FaSlackHash size="30px"/> <span>Explore</span>
                            </button>
                        </Link>
                    )}

                {auth && (
                    <footer className="nav-footer">
                        {logoutDisplay === true && (
                            <div>
                                <h3 onClick={() => {
                                    logout()
                                    setLogoutDisplay(!logoutDisplay)    
                                }}>logout</h3>
                            </div>
                        )}
                        <div className="nav-user" onClick={() => setLogoutDisplay(!logoutDisplay)}>
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
        </div>
    )
}