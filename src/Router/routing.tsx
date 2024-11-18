import Home from "../pages/Home";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ChatPage from "../pages/Chat";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";



const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Login} path="/login" />
                <Route Component={Home} path="/" />
                <Route  element={<PrivateRoute component={ChatPage} />} path="/chat" />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;