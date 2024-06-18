'use client'

import React from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function toastAlert(){
    const notify=()=>toast.error("Login Please!!");
    return (
        <div>
          <ToastContainer />
          <button onClick={notify}>Notify !</button>
          
        </div>
      );
}

export default toastAlert