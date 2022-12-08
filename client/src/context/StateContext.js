import { createContext, useContext, useState } from "react";

const Context = createContext()

export const StateContext = ({ children }) => {
    const [ auth, setAuth ] = useState(null)

    const login = (user) => {
        setAuth(user)
        console.log(user)
    }

    const logout = () => setAuth(null)

    return (
        <Context.Provider
        value={{
            auth,
            login,
            logout
        }}
        >

        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)