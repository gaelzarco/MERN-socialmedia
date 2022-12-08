import { useState, useEffect } from 'react'
import { useStateContext } from "../context/StateContext";

export default function Feed() {
    const { auth } = useStateContext()
    const [ apiConnection, setApiConnection ] = useState(null)

    useEffect(() => {
      fetch('api')
      .then(res => res.json())
      .then(json => setApiConnection(json))
    }, [])

    return (
        <div className='feed'>
            {auth && (
                <header className='feed-header'>
                    <h2>Home</h2>
                </header>
                )}
            <div>{apiConnection && apiConnection.message}</div>

            {auth && (
                <div style={{paddingTop: '20px'}}>User is logged in!</div>
            )}
        </div>
    )
}