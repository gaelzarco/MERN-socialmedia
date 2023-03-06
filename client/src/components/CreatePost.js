import { useState } from 'react'
import { useStateContext } from "../context/StateContext"
import { GoFileMedia } from "react-icons/go"

export default function CreatePost() {
    const { auth } = useStateContext()

    const [ post, setPost ] = useState({
        user: auth.user._id,
        body: '',
        media: ''
    })
    
    const [ imgView, setImgView ] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        let formData = new FormData()
        formData.append('user', post.user)
        formData.append('body', post.body)
        if (typeof post.media !== "string") {
            formData.append('media', post.media, post.media.name)
        }

        console.log(formData)

        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${auth.accessToken}`
            },
            body: formData
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
        <div className="create-post">
           <form onSubmit={handleSubmit} autoComplete='off' encType="multipart/form-data">
                <div className="create-post-content">
                        <img className="create-post-user-img" src={auth.user.img} alt='User'/>
                        <div className="create-post-input-div">
                            <input
                                className="create-post-input"
                                type='text'
                                htmlFor='body'
                                name='body'
                                placeholder="Share your thoughts"
                                value={post.body}
                                onChange={e => setPost({ ...post, body: e.target.value })}
                                required
                            />
                        </div>
                </div>
                
                {imgView && (
                    <div className='create-post-img'>
                        <input 
                        className='create-post-img-input'
                        htmlFor='media'
                        name='media'
                        type='file'
                        onChange={e => {
                            setPost({ ...post, media: e.target.files[0] })
                        }}
                        />
                    </div>
                )}

                <div className="create-post-footer">
                    <div className='create-post-img-btn' onClick={() => setImgView(!imgView)}>
                        <GoFileMedia color="rgb(184, 108, 255)" size='20px'/>
                    </div>
                    <button className="create-post-btn" type='submit'>Post</button>
                </div>
           </form>
        </div>
    )
}