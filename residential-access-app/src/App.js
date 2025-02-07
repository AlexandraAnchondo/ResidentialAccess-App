import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import UserNavbar from "./modules/Usuarios/Navbar"
import GuardsNavbar from "./modules/Guardias/Navbar"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UserNavbar />} />
                <Route path="/guards" element={<GuardsNavbar />} />
            </Routes>
        </Router>
    )
}

export default App

