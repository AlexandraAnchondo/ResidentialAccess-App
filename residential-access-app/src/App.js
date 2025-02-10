import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import UserNavbar from "./modules/Usuarios/Navbar"
import GuardsNavbar from "./modules/Guardias/Navbar"
import AdminNavbar from "./modules/Administrador/Navbar"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UserNavbar />} />
                <Route path="/guards" element={<GuardsNavbar />} />
                <Route path="/admin" element={<AdminNavbar />} />
            </Routes>
        </Router>
    )
}

export default App

