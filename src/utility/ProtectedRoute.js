import React from "react";
import { Auth } from "../auth";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children})=>{
const checkUser = Auth()
return checkUser? children: <Navigate to={"/"}/>
}

export default ProtectedRoute