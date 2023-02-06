import { useStateContext } from "../context/StateContext"
import { StateContext } from "../context/StateContext"

import { IoMdArrowRoundBack } from "react-icons/io"

export default function Profile() {
    const { auth, navigate } = useStateContext(StateContext)

    console.log(auth.user)
    return (
        <div className='feed'>
            <div className='feed-header'>
                <IoMdArrowRoundBack size='20px' onClick={() => navigate(-1)}/>
                <div className="profile-header">
                    <h2>{auth.user.userName}</h2>
                </div>
            </div>
        </div>
    )
}