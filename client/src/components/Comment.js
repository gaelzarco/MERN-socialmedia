import { CreateComment } from "."

import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { GoX } from "react-icons/go"
import { IoHeartOutline } from "react-icons/io5"

import { useStateContext } from "../context/StateContext"

export default function Comment() {
    const { id } = useParams()
    const { auth, navigate } = useStateContext()

    const [ comment, setComment ] = useState(null)

    useEffect(() => {
        fetch(`/api/comments/${id}`)
        .then(res => res.json())
        .then(data => setComment(data))
    }, [id])

    console.log(comment)

    return (
        <div className="commentId-container">
            <div className="commentId">
                <div className='commentId-header'>
                    <span>
                        <Link onClick={() => navigate(-1)}><GoX size='30px'/></Link>
                    </span>
                    <span className='commentId-header-title'>
                        {comment !== null && ( <h2>In reply to {comment.post.user.userName}'s post</h2> )}
                    </span>
                </div>
                <div>
                    {comment !== null && (
                        <div className="postId-container">
                            <div className="post">
                                <span className='postId-span'>
                                    <img src={comment.user.img} alt='profile' style={{height: '50px', width: '50px', borderRadius: '100px', marginTop: '10px'}}/>
                                    <div className="postId-user-div">
                                        <h4>{comment.user.firstName} {comment.user.lastName}</h4>
                                        <p>@{comment.user.userName}</p>
                                    </div>
                                </span>
        
                                <div className='postId-body'>
                                    {comment.body}
                                    {comment.media && (
                                        <div className='postId-media'>
                                            <img className='post-img' src={comment.media} alt='Post-media'/> 
                                        </div>
                                    )}
                                </div>
                                <div className='postId-icons'>
                                    <span className='postId-like-btn'>
                                        <IoHeartOutline size="23px"/>
                                    </span>
                                    <span>
                                        <p style={{marginBottom: '21px'}}>{comment.likes && comment.likes.length} Likes</p>
                                    </span>
                                </div>
                            </div>
                            {auth && (
                                    <div className="postId-create-comment">
                                        <CreateComment postId={id} />
                                    </div>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}