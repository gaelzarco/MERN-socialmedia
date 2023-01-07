import { useState } from "react"
import { Link } from "react-router-dom"
import { GoOctoface } from "react-icons/go"
import { GoX } from "react-icons/go"

import { useStateContext } from "../context/StateContext"

export default function Login() {
    const { login, navigate } = useStateContext()

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
            navigate(-1)
        } else {
            setErrMessage(data.message)
        }
    }

    return (
        <div className="login-container">
            <div className="login">
                <div className="login-cancel">
                <Link to='/'><GoX size="20px"/></Link>
                </div>
                <GoOctoface size="40px" className="logo"/>
                <h2>Sign in to SM</h2>
                
                {errMessage &&
                    <div className="err-msg-container">
                        {errMessage}
                    </div>
                }

                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor='userName'> Username </label> 
                    <input
                        className='text-input'
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
                        className='text-input'
                        type="password" 
                        name="password"
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                    </div>
                    <input type="submit" value="Login" className="btn"/>
                </form>
                </div>
        </div>
    )
}