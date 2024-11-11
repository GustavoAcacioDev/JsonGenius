import Home from "../pages/Home";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ChatPage from "../pages/Chat";



const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Home} path="/" />
                <Route Component={ChatPage} path="/chat" />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;