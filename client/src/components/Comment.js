import { useStateContext } from "../context/StateContext"
import { CreateComment } from "."

import { IoHeartOutline } from "react-icons/io5"

export default function Comment({ comment, post }) {
    const { auth } = useStateContext()
    // console.log(comment)
    // console.log(post)

    return (
        <>
            {comment !== null && (
                <>
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
                                <CreateComment commentId={comment._id} postId={post}/>
                            </div>
                        )}

                        {comment.comments && (
                            comment.comments.map((reply, i) => {
                                return (
                                    <div className="post-container" key={i}>
                                        <div className="post">
                                            <span className='post-span'>
                                                <img src={reply.user.img} alt='profile' style={{height: '50px', width: '50px', borderRadius: '100px', marginTop: '10px'}}/>
                                                <div className="post-user-div">
                                                    <h4>{reply.user.firstName} {reply.user.lastName}</h4>
                                                <p>@{reply.user.userName}</p>
                                                </div>
                                            </span>
                    
                                            <div className='post-body'>
                                                {reply.body}
                                                {reply.media && (
                                                    <div className='post-media'>
                                                        <img className='post-img' src={reply.media} alt='Post-media'/> 
                                                    </div>
                                                )}
                                            </div>
                                            <div className='post-icons'>
                                                <span className='post-like-btn'>
                                                    <IoHeartOutline size="23px"/>
                                                </span>
                                                <span>
                                                    <p style={{marginBottom: '21px'}}>{reply.likes && reply.likes.length} Likes</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </>
            )}
        </>
    )
}