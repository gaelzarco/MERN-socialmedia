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
        console.log(user)
    }

    const logout = () => setAuth(null)

    const fetchPosts = async () => {
        await fetch(`/api/posts`)
        .then(res => res.json())
        .then(data => setPosts(data))
    }

    const fetchPost = async (id) => {
        fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
    }

    const addLike = async (postId) => {
        if (!auth) {
            return navigate('/login')
        }

        const res = await fetch(`/api/like/${auth.user._id}/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
        })

        const data = await res.json()

        const newPosts = posts.filter((post) => post._id !== data._id)
        await setPosts([{...data}, ...newPosts])
        await setPost(post => post = data)
    }

    return (
        <Context.Provider
        value={{
            navigate,
            auth,
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