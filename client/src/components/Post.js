import { useEffect } from "react"
import  { useParams, Link } from "react-router-dom"
import { useStateContext } from "../context/StateContext";
import { CreateComment } from "."

import { IoMdArrowRoundBack } from "react-icons/io"
import { IoHeartOutline } from "react-icons/io5"

export default function Post() {
    const { id } = useParams()
    const { auth, post, fetchPost, addLike, navigate } = useStateContext()

    useEffect(() => {
        fetchPost(id)
    }, [id, fetchPost, addLike])

    return (
        <div className="feed">
            <header className="feed-header">
                <Link to='/'><IoMdArrowRoundBack size="20px"/></Link>
                <h2 className="feed-header-h2">Thread</h2>
            </header>

            {post._id === id && (
                <div className="postId-container">
                    <div className="post">
                        <span className='postId-span'>
                            <img src={post.user.img} alt='profile' style={{height: '50px', width: '50px', borderRadius: '100px', marginTop: '10px'}}/>
                            <div className="postId-user-div">
                                <h4>{post.user.firstName} {post.user.lastName}</h4>
                                <p>@{post.user.userName}</p>
                            </div>
                        </span>

                        <div className='postId-body'>
                            {post.body}
                            {post.media && (
                                <div className='postId-media'>
                                    <img className='post-img' src={post.media} alt='Post-media'/> 
                                </div>
                            )}
                        </div>
                        <div className='postId-icons'>
                            <span className='postId-like-btn' onClick={() => addLike(post._id, true)}>
                                <IoHeartOutline size="23px"/>
                            </span>
                            <span>
                                <p style={{marginBottom: '21px'}}>{post.likes && post.likes.length} Likes</p>
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

            {post.comments ? (
                post.comments.map((comment, i) => {
                    return (
                        <div className="post-container" key={i}>
                            <div className="post">
                                <span className='post-span'>
                                    <img src={comment.user.img} alt='profile' style={{height: '30px', width: '30px', borderRadius: '100px'}}/>
                                    <h4>{comment.user.firstName} {comment.user.lastName}</h4>
                                    <p>@{comment.user.userName}</p>
                                </span>
        
                                <div className='post-body' onClick={() => navigate(`/comment/${comment._id}`)}>
                                        {comment.body}
                                        {comment.media && (
                                            <div className='post-media'>
                                            <img className='post-img' src={comment.media} alt='Post-media'/> 
                                            </div>
                                        )}
                                </div>

                                <div className='post-icons'>
                                    <span className='post-like-btn' onClick={() => addLike(comment._id)}>
                                        <IoHeartOutline size="23px"/>
                                    </span>
                                    <span>
                                        <p style={{marginBottom: '21px'}}>{comment.likes.length} Likes</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : <h1>Start the conversation</h1>}
        </div>
    )
}