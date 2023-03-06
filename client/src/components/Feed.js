import { useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useStateContext } from "../context/StateContext";
import { CreatePost } from "."

import { IoHeart, IoHeartOutline } from "react-icons/io5"
import { MdComment } from 'react-icons/md';

export default function Feed() {
    const { auth, navigate, fetchPosts, posts, addLike } = useStateContext()

    useEffect(() => {
        posts === null && fetchPosts()
    }, [posts, fetchPosts, addLike])

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

            <div>
                {(posts && posts.length > 0) && (posts.map((post, i) => {
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
                                    {(post.media !== null && post.media !== undefined) && (
                                        <div className='post-media'>
                                        <img className='post-img' src={post.media} alt='Post-media'/> 
                                        </div>
                                    )}
                                </div>
                                <div className='post-icons'>
                                    <span className='like-btn' onClick={() => addLike(post._id)}>
                                    {(auth !== null && post.likes.find(like => like === auth.user._id))
                                      ? <IoHeart size='23px' color='red' /> : <IoHeartOutline size='23px' /> }
                                    </span>
                                    <span>
                                        {post.likes && post.likes.length}
                                    </span>
                                    <Link to={`/post/${post._id}`}>
                                        <span className='comment-btn'>
                                            <MdComment size="18px" color='gray'/>
                                        </span>
                                    </Link>
                                    <span>
                                        {post.comments && post.comments.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }))}
            </div>
        </div>
    )
}