import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../context/StateContext"

export default function SideBar() {
    const { auth } = useStateContext()
    const [ users, setUsers ] = useState(null)

    let profileImgStyle = {
        height: '65px',
        width: '65px',
        borderRadius: '100px'
    }

    // const fetchUsers = async () => {
    //     const res = await fetch(`/api/user/`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${auth.accessToken}`
    //         },
    //     })

    //     const data = await res.json()

    //     setUsers(data)
    // }

    useEffect(() => {
        if (auth) {
            fetch(`/api/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                },
            })
            .then(res => res.json())
            .then(data => setUsers(data))
        }
    }, [auth])

    console.log(users)

    return (
        <div className="side-bar-container">
            <div className="side-bar">
                {auth && users ? (
                        <div className='side-bar-follow-container'>
                            <h3 style={{ marginTop: '5px' }}>Who To Follow</h3>
                            {users.map((user, i) => {
                                return (
                                    <div className='side-bar-follow' key={i}>
                                            <img  style={profileImgStyle} src={user.img} alt='profile'/>
                                            <div className="side-bar-follow-user">
                                                <h4>{user.firstName} {user.lastName}</h4>
                                                <p>{user.userName}</p>
                                            </div>
                                    </div>
                                )
                            })}
                        </div>
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