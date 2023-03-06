import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext()

export const StateContext = ({ children }) => {
    const navigate = useNavigate()

    const [ auth, setAuth ] = useState(null)
    const [ posts, setPosts ] = useState(null)

    const fetchPosts = () => {
        fetch(`/api/posts/`)
        .then(res => res.json())
        .then(data => setPosts(data))
        console.log(posts)
    }

    const addLike = async (id) => {
        if (!auth) {
            return navigate('/login')
        }

        const res = await fetch(`/api/like/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            body: JSON.stringify(auth.user)
        })

        const data = await res.json()
        console.log(data)

        if (posts !== null) {
            const newPosts = posts.filter(post => post._id !== data._id)
            await setPosts([{...data}, ...newPosts])
        }
    }

    const expirationTime = 7200

    const setTokenTimestamp = () => localStorage.setItem('token_timestamp', Date.now())
    const getTokenTimestamp = () => localStorage.getItem('token_timestamp')

    const login = (user) => {
        setAuth(user)
        setTokenTimestamp()
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        setAuth(null)
        localStorage.clear()
    }

    return (
        <Context.Provider
        value={{
            navigate,
            auth,
            fetchPosts,
            posts,
            addLike,
            setAuth,
            getTokenTimestamp,
            expirationTime,
            login,
            logout,
        }}
        >

        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)