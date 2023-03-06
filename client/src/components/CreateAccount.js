import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoX } from "react-icons/go"

import { useStateContext } from '../context/StateContext'

import { DragDrop } from '.'

export default function CreateAccount() {

    const { login } = useStateContext()
    const navigate = useNavigate()

    const [ errMessage, setErrMessage ] = useState(null)
    const [ credentials, setCredentials ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        img: '',
        bio: '',
        password: '',

    })

    const imgState = (file) => {
        setCredentials({ ...credentials, img: file })
        console.log(credentials)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let formData = new FormData()
        for (let [ key, value ] in Object.entries(credentials)) {
            formData.append(`${key}`, value)
        }
        if (typeof credentials.img !== 'string') {
            formData.append('img', credentials.img, credentials.img.name)
        }

        const res = await fetch('api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
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
        <div className="login-container">
            <div className='login'>
                <div className="login-cancel">
                    <Link to='/'><GoX size="20px"/></Link>
                </div>
            <h2>Create your account</h2>

            {errMessage &&
                <div className="err-msg-container">
                    {errMessage}
                </div>
            }

            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="firstName"> First Name </label>
                    <input
                    className='text-input'
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
                    className='text-input'
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
                        className='text-input'
                        type='email'
                        name='email'
                        value={credentials.email}
                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='userName'> Username </label>
                    <input
                        className='text-input'
                        type='text'
                        name='userName'
                        value={credentials.userName}
                        onChange={e => setCredentials({ ...credentials, userName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='img'> Profile Picture </label>
                    <DragDrop changeState={imgState} />
                </div>
                <div>
                    <label htmlFor='bio'> Bio </label>
                    <textarea
                        className='text-input'
                        type='text'
                        name='bio'
                        value={credentials.bio}
                        onChange={e => setCredentials({ ...credentials, bio: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor='password'> Password </label>
                    <input
                        className='text-input'
                        type='password'
                        name='password'
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                </div>
                <button type='submit' className='btn' style={{ textAlign: 'center' }}> Create </button>
            </form>
            </div>
        </div>
    )
}