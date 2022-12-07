import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useStateContext } from '../context/StateContext'

export default function CreateAccount() {

    const { login } = useStateContext()
    const navigate = useNavigate()

    const [ errMessage, setErrMessage ] = useState(null)
    const [ credentials, setCredentials ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        profileImg: '',
        bio: '',
        password: '',

    })

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await fetch('api/user', {
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
        <div className="create-account">
            <h2>Create Account</h2>

            {errMessage &&
                <div className="err-msg-container">
                    {errMessage}
                </div>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName"> First Name </label>
                    <input
                        type="text"
                        name="firstName"
                        value={credentials.firstName}
                        onChange={e => setCredentials({ ...credentials, firstName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='lastName'> Last Name </label>
                    <input
                        type='text'
                        name='lastName'
                        value={credentials.lastName}
                        onChange={e => setCredentials({ ...credentials, lastName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email'> Email </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={credentials.email}
                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='userName'> Username </label>
                    <input
                        type='text'
                        name='userName'
                        value={credentials.userName}
                        onChange={e => setCredentials({ ...credentials, userName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='img'> Profile Picture </label>
                    <input
                        type='text'
                        name='img'
                        value={credentials.profileImg}
                        onChange={e => setCredentials({ ...credentials, profileImg: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor='bio'> Bio </label>
                    <textarea
                        type='text'
                        name='bio'
                        value={credentials.bio}
                        onChange={e => setCredentials({ ...credentials, bio: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor='password'> Password </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                </div>
                <input type='submit' value='Create' className='btn' style={{ textAlign: 'center' }}/>
            </form>

            <button className='btn'><Link to='/login'>Back To Login</Link></button>
        </div>
    )
}