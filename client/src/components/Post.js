import { useEffect, useState } from "react"
import  { useParams, Link } from "react-router-dom"
import { useStateContext } from "../context/StateContext";

import { IoMdArrowRoundBack } from "react-icons/io"
import { IoHeartOutline } from "react-icons/io5"

export default function Post() {
    const { id } = useParams()
    const { auth, post, fetchPost, addLike } = useStateContext()

    useEffect(() => {
        fetchPost(id)
    }, [id])

    return (
        <div className="feed">
            <header className="feed-header">
                <Link to='/'><IoMdArrowRoundBack size="20px"/></Link>
                <h2 className="feed-header-h2">Thread</h2>
            </header>

            {post._id === id && (
                <div className="post-container">
                    <div className="post">
                        <span className='postId-span'>
                            <img src={post.user.img} alt='profile' style={{height: '50px', width: '50px', borderRadius: '100px'}}/>
                            <div>
                                <h4>{post.user.firstName} {post.user.lastName}</h4>
                                <p>@{post.user.userName}</p>
                            </div>
                        </span>

                        <div className='postId-body'>
                                {post.body}
                                {post.media && (
                                    <div className='post-media'>
                                    <img className='post-img' src={post.media} alt='Post-media'/> 
                                    </div>
                                )}
                        </div>
                        <div className='postId-icons'>
                            <span className='postId-like-btn' onClick={() => addLike(post._id)}>
                                <IoHeartOutline size="23px"/>
                            </span>
                            <span>
                                <p style={{marginBottom: '21px'}}>{post.likes && post.likes.length} Likes</p>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}