import React, { createContext, useEffect, useState } from 'react';
import Home from './pages/Home'
import { useCookies } from 'react-cookie';
import {BrowserRouter as Router } from 'react-router-dom';
import {Bounce, ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

const App = () => {
  const [cookie, setCookie,removeCookie] = useCookies(['token'])
  
  const generateToast =(message, type)=>{
    toast(message,{
      type: type,

      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      
  });
  }

   return (
    <Router>
    <AuthContext.Provider value={{cookie, setCookie, removeCookie, generateToast}} >
      
         <Home/>
        
      <ToastContainer />

    </AuthContext.Provider>
    </Router>
  )
}

  

export default App;
