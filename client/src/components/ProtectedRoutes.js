import { Outlet, Navigate } from "react-router-dom"
import { useStateContext } from "../context/StateContext"

export default function ProtectedRoutes() {
    const { auth } = useStateContext()

    return (
        auth ? <Outlet /> : <Navigate to='/'/>
    )
}