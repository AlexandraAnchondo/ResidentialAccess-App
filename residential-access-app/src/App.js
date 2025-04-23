import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import UserNavbar from "./modules/Usuarios/Navbar"
import GuardsNavbar from "./modules/Guardias/Navbar"
import AdminNavbar from "./modules/Administrador/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute roles={["usuario"]} />}>
                    <Route path="/users" element={<UserNavbar />} />
                </Route>

                <Route element={<ProtectedRoute roles={["guardia"]} />}>
                    <Route path="/guards" element={<GuardsNavbar />} />
                </Route>

                <Route element={<ProtectedRoute roles={["admin"]} />}>
                    <Route path="/admin" element={<AdminNavbar />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App

