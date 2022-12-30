import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useStateContext } from "../context/StateContext";
import { CreatePost } from "."

import { IoHeartOutline } from "react-icons/io5"
import { MdComment } from 'react-icons/md';

export default function Feed() {
    const { auth } = useStateContext()
    const navigate = useNavigate()
    
    const [ posts, setPosts ] = useState(null)

    const fetchPosts = async () => {
        await fetch(`/api/posts`)
        .then(res => res.json())
        .then(data => setPosts(data))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const addLike = async (postId) => {
        if (!auth) {
            return navigate('/login')
        }

        const res = await fetch(`/api/posts/like/${auth.user._id}/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
        })

        const data = await res.json()

        const newPosts = posts.filter((post) => post._id !== data._id)
        await setPosts([{...data}, ...newPosts])
    }
    
    return (
        <div className='feed'>
            {auth && (
                <>
                    <header className='feed-header'>
                        <h2>Home</h2>
                    </header>

                    <CreatePost />
                </>
                )}
                <div>
                {posts && posts.length > 0 ? (posts.map((post, i) => {
                    return (
                        <div key={i}>
                            <div className='post'key={i}>
                                {post.user && (
                                    <span className='post-span'>
                                        <img src={post.user.img} alt='profile' style={{height: '30px', width: '30px', borderRadius: '100px'}}/>
                                        <h3>{post.user.firstName} {post.user.lastName}</h3>
                                        <p>@{post.user.userName}</p>
                                    </span>
                                )}
                                <Link to="/post">
                                    <div className='post-body'>
                                        {post.body}

                                        {post.media && (
                                            <div className='post-media'>
                                            <img className='post-img' src={post.media} alt='Post-media'/> 
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <div className='post-icons'>
                                    <span>
                                        <span className='like-btn' onClick={() => addLike(post._id)}><IoHeartOutline /></span>
                                        <p>{post.likes && post.likes.length}</p>
                                    </span>
                                    <div className='comment-btn'><MdComment /></div>
                                </div>
                            </div>
                            <div className='post-space' />
                        </div>
                    )
                })) : <h1>posts not fetched yet...</h1>}
                </div>
        </div>
    )
}