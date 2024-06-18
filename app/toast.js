'use client'

import React from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function toastAlert(){
    const notify=()=>toast.error("Login Please!!");
    return (
        {notify}
      );
}

 