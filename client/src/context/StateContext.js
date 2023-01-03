import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext()

export const StateContext = ({ children }) => {
    const navigate = useNavigate()

    const [ auth, setAuth ] = useState(null)
    const [ posts, setPosts ] = useState(null)
    const [ post, setPost ] = useState({})

    const login = (user) => {
        setAuth(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        setAuth(null)
        localStorage.clear()
    }

    const fetchPosts = async () => {
        await fetch(`/api/posts`)
        .then(res => res.json())
        .then(data => setPosts(data))
    }

    const fetchPost = async (postId) => {
        await fetch(`/api/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data))
    }

    const addLike = async (id, postBool) => {
        if (!auth) {
            return navigate('/login')
        }

        const res = await fetch(`/api/like/${postBool === true ? id : 'comment/' + id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            body: JSON.stringify(auth.user)
        })

        const data = await res.json()
        console.log(data)

        const newPosts = posts.filter(post => post._id !== data._id)
        setPosts([{...data}, ...newPosts])
        setPost(post => post = data)
    }

    return (
        <Context.Provider
        value={{
            navigate,
            auth,
            setAuth,
            login,
            logout,
            posts,
            post,
            fetchPosts,
            fetchPost,
            addLike,
        }}
        >

        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)