import { useState, useEffect } from 'react'
import { useStateContext } from "../context/StateContext";
import { CreatePost } from "."

import { IoHeartOutline } from "react-icons/io5"

import { MdComment } from 'react-icons/md';

export default function Feed() {
    const { auth } = useStateContext()
    
    const [ posts, setPosts ] = useState(null)

    useEffect(() => {
        fetch(`/api/post`)
        .then(res => res.json())
        .then(data => setPosts(data))
    }, [])

    console.log(posts)
    
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
                <div>{posts && posts.map((post, i) => {
                    return (
                        <>
                        <div className='post' key={i}>
                            <span className='post-span'>
                                <img src={post.user.img} alt='profile' style={{height: '30px', width: '30px', borderRadius: '100px'}}/>
                                <h3>{post.user.firstName} {post.user.lastName}</h3>
                                <p>@{post.user.userName}</p>
                            </span>
                            <div className='post-body'>
                                {post.body}

                                {post.media && (
                                    <div className='post-media'>
                                       <img className='post-img' src={post.media}/> 
                                    </div>
                                )}
                            </div>
                            <div className='post-icons'>
                                    <div><IoHeartOutline /></div>
                                   <div> <MdComment /></div>
                                </div>
                        </div>
                        <div className='post-space'>
                        </div>
                        </>
                    )
                })}</div>
        </div>
    )
}