import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { useStateContext } from "../context/StateContext"

export default function Login() {

    const navigate = useNavigate()
    const { user, login } = useStateContext()

    const [ credentials, setCredentials ] = useState({
        email: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await fetch(`http://localhost:5000/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await res.json()
        console.log(data)

        if (res.status(200)) {
            login(data.user._id)
            console.log(user)
            navigate('/')
        }
    }

    return (
        <div className="login">
            {user ? (
                <>
                    <p>You are already logged in!</p>
                    <button className="btn"><Link to='/'>Home</Link></button>
                </>
            ) : (
                <>
                <form onSubmit={handleSubmit}>
                        <label htmlFor='email'> Email </label>
                        <input
                            type="email"
                            htmlFor="email"
                            name="email"
                            value={credentials.email}
                            onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                            required
                        />
                        <label htmlFor="password"> Password </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            value={credentials.password}
                            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                        <input type="submit" value="login"/>
                    </form>

                    <p>Don't have an account?</p>
                    <button className="btn"><Link to='/create-account'>Create Account</Link></button>
                </>
            )}
        </div>
    )
}