/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ roles }) => {
    const token = localStorage.getItem("token")
    const rol = localStorage.getItem("rol")

    if (!token) {
        return <Navigate to="/login" />
    }
    if (roles && !roles.includes(rol)) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default ProtectedRoute
