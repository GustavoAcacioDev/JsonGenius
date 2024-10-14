import Minify from "../pages/Minify";
import Format from "../pages/Format";
import Home from "../pages/Home";
import Validate from "../pages/Validate";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";



const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Home} path="/" />
                <Route Component={Format} path="/format" />
                <Route Component={Minify} path="/minify" />
                <Route Component={Validate} path="/validate" />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;