import { useRef, useState } from 'react'

export default function DragDrop({ changeState }) {
    const [file, setFile] = useState(null)
    const inputRef = useRef()

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setFile(e.dataTransfer.files[0])
        changeState(e.dataTransfer.files[0])
    }

    if (file) return (
        <div className="uploads">
            <h1>
                {file.name}
            </h1>
            <div className="uploads-actions">
                <button onClick={() => {
                    setFile(null)
                    changeState('')
                    }}>Cancel</button>
            </div>
        </div>
    )

    return (
        <>
            {!file && (
                <div className='dropzone' 
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
                >
                    <p>Drag and drop</p>
                    <p>Or</p>
                    <input
                        type="file"
                        onChange={e => {
                            setFile(e.target.files[0])
                            changeState(e.target.files[0])
                        }}
                        hidden
                        ref={inputRef}
                    />
                    <button 
                    onClick={(e) => {
                        e.preventDefault()
                        inputRef.current.click()
                }}>Select Files</button>
                </div>
            )}
        </>
    )
}