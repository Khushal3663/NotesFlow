import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { BASE_URL } from "../baseUrl.js";


const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [wantLogin, setWantToLogin] = useState(true);

  const { cookie, setCookie, generateToast } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(wantLogin){
        login();
    }
    else{
        register();
        
    }
    
  };

  const login= async ()=>{
    try {
        const response = await fetch(`${BASE_URL}/api/v1/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials:true,
          mode: "cors",
          body: JSON.stringify(user),
        });
        const data = await response.json();
        
        if(response.status == "200"){
            // success message toast
            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime()+ 1000*60*60);
            setCookie("token", data.token, {
                expires: expireDate
              });

            generateToast("Login successfully","success");
            navigate("/")
        }
        else{
            if(response.status == "409"){
                generateToast(data.message,"error")
            }
        }
        
        
      } catch (error) {
        console.log(error);
      }
  }

  const register = async ()=>{

    if(user.username == ""){
        generateToast("Please Enter Username first","error")
        return;
    } 
    if(user.password == ""){
        generateToast("Please Enter Password first","error")
        return;
    }
    try {
        const response = await fetch(`${BASE_URL}/api/v1/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials:true,
          mode: "cors",
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if(response.status =='409'){
            generateToast(data.message,"error");
        }else{
            generateToast(data.message,"success");
            setWantToLogin(true);
        }
        console.log(data);
        
      } catch (error) {
        generateToast("Error ouccured!",'error');
        console.log(error.message);
      }
  }

  return (
    
    <div className="login-inner-container">
    <div className="app-login">
      <div className="app-header ">
        <h1>{wantLogin? "Login" : "Register" }</h1>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            name="username"
            placeholder="Enter Username here "
            required
          ></input>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            name="password"
            placeholder="Enter Password here "
            required
          ></input>
          <button type="submit">{wantLogin? "Login": "Register"}</button>
        </form>
      </div>
      <div className="login-footer">
         {wantLogin? 
        <h3>
          New To Notes? <span onClick={()=>setWantToLogin(false)}><u>Register</u></span>
        </h3>
        : <h3>Already a User? <span  onClick={()=>{setWantToLogin(true)}}><u>Log In</u></span></h3>} 
      </div>
    </div>
    </div>
  );
};

export default Login;
