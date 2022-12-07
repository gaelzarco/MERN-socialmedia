import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { useStateContext } from "../context/StateContext"

export default function Login() {

    const navigate = useNavigate()
    const { login } = useStateContext()

    const [ errMessage, setErrMessage ] = useState(null)
    const [ credentials, setCredentials ] = useState({
        userName: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await fetch(`api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await res.json()

        if (res.status === 200) {
            login(data)
            navigate('/')
        } else {
            setErrMessage(data.message)
        }
    }

    return (
        <div className="login">
            <h2>Login</h2>
            
            {errMessage &&
                <div className="err-msg-container">
                    {errMessage}
                </div>
            }

            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor='userName'> Username </label> 
                <input
                    type="text"
                    htmlFor="userName"
                    name="userName"
                    value={credentials.userName}
                    onChange={e => setCredentials({ ...credentials, userName: e.target.value })}
                    required
                />
                </div>
                <div>
                <label htmlFor="password"> Password </label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={credentials.password}
                    onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    required
                />
                </div>
                <input type="submit" value="Login" className="btn"/>
            </form>

            <p>Don't have an account?</p>
            <button className="btn"><Link to='/create-account'>Sign-up</Link></button>
        </div>
    )
}