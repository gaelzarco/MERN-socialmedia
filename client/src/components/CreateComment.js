import { useState } from "react";
import { useStateContext } from "../context/StateContext";

import { GoFileMedia } from "react-icons/go";

export default function CreateComment({ postId }) {
    const { auth } = useStateContext()
    console.log(postId)

    const [ comment, setComment ] = useState({
        user: auth && auth.user,
        body: '',
        media: '',
    })

    const [ imgView, setImgView ] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await fetch(`/api/comments/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${auth.accessToken}`
            },
            body: JSON.stringify(comment)
        })

        const data = await res.json()

        if (res.status === 200) {
            console.log('Post successful!')
            console.log(data)
            window.location.reload()
        } else {
            console.log('Failed to post')
        }
    }

    return (
        <div className='create-post'>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className="create-post-content">
                        <img className="create-post-user-img" src={auth.user.img} alt='User'/>
                        <div className="create-post-input-div">
                            <input
                                className="create-post-input"
                                type='text'
                                htmlFor='body'
                                name='body'
                                placeholder="Share your thoughts"
                                value={comment.body}
                                onChange={e => setComment({ ...comment, body: e.target.value })}
                                required
                            />
                        </div>
                </div>
                
                {imgView && (
                    <div className='create-post-img'>
                        <input 
                        className='create-post-img-input'
                        htmlFor='img'
                        name='img'
                        placeholder='Provide img link here'
                        value={comment.media}
                        onChange={e => setComment({ ...comment, media: e.target.value })}
                        />
                    </div>
                )}

                <div className="create-post-footer">
                    <div className='create-post-img-btn' onClick={() => setImgView(!imgView)}>
                        <GoFileMedia color="rgb(184, 108, 255)" size='20px'/>
                    </div>
                    <button className="create-post-btn" tybe='submit'>Post</button>
                </div>
           </form>
        </div>
    )
}