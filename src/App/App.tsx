import React from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import Dashboard from "../Components/Page/Dashboard/Dashboard";
import Login from "../Components/Page/login/Login";
import ForgetPassword from "../Components/Page/forgetPassword/ForgetPassword";
import Register from "../Components/Page/register/Register";
import ChangePassword from "../Components/Page/changePassword/ChangePassword";

function App() {
    return (
        <Routes>
            <Route path={"/*"} element={<Dashboard/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/forget-password"} element={<ForgetPassword/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/change-password"} element={<ChangePassword/>}/>
        </Routes>
    );
}

export default App;
