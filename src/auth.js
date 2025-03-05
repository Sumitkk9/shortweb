import React from "react";

export const Auth = ()=>{
    const tokken = localStorage?.getItem("accessToken")
    if(tokken){
        return true
    }else{
        return false
    }
}