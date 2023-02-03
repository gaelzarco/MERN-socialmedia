import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext()

export const StateContext = ({ children }) => {
    const navigate = useNavigate()

    const [ auth, setAuth ] = useState(null)

    const expirationTime = 7200

    const setTokenTimestamp = () => localStorage.setItem('token_timestamp', Date.now())
    const getTokenTimestamp = () => localStorage.getItem('token_timestamp')

    const login = (user) => {
        setAuth(user)
        setTokenTimestamp()
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        setAuth(null)
        localStorage.clear()
    }

    return (
        <Context.Provider
        value={{
            navigate,
            auth,
            setAuth,
            getTokenTimestamp,
            expirationTime,
            login,
            logout,
        }}
        >

        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)