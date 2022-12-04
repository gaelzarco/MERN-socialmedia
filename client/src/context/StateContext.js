import { createContext, useContext, useState } from "react";

const Context = createContext()

export const StateContext = ({ children }) => {
    const [ user, setUser ] = useState(null)

    const login = (userId) => {
        setUser(userId)
    }

    return (
        <Context.Provider
        value={[
            user,
            login
        ]}
        >

        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)