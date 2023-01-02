import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useStateContext } from "../context/StateContext";
import { CreatePost } from "."

import { IoHeartOutline } from "react-icons/io5"
import { MdComment } from 'react-icons/md';

export default function Feed() {
    const { auth, navigate, posts, fetchPosts, addLike } = useStateContext()

    useEffect(() => {
        fetchPosts()
    }, [])
    
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
                {posts && posts.length > 0 && (posts.map((post, i) => {
                    return (
                        <div className='post-container'key={i}>
                            <div className='post'>
                                {post.user && (
                                    <span className='post-span'>
                                        <img src={post.user.img} alt='profile' style={{height: '30px', width: '30px', borderRadius: '100px'}}/>
                                        <h4>{post.user.firstName} {post.user.lastName}</h4>
                                        <p>@{post.user.userName}</p>
                                    </span>
                                )}
                                <div className='post-body' onClick={() => navigate(`/post/${post._id}`)}>
                                    {post.body}
                                    {post.media && (
                                        <div className='post-media'>
                                        <img className='post-img' src={post.media} alt='Post-media'/> 
                                        </div>
                                    )}
                                </div>
                                <div className='post-icons'>
                                    <span className='like-btn' onClick={() => addLike(post._id)}>
                                        <IoHeartOutline size="18px"/>
                                    </span>
                                    <span>
                                        {post.likes && post.likes.length}
                                    </span>
                                    <Link to={`/post/${post._id}`}>
                                        <div className='comment-btn'>
                                            <MdComment size="18px"/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }))}
            </div>
        </div>
    )
}