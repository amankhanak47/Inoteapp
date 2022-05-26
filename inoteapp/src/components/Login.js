import React, { useState } from 'react'
import "./signup.css"
import { Link, useNavigate } from "react-router-dom";

const Login = ({showalert}) => {
  const [credentials,setCredentials]=useState({email:"",password:""});
  let navigate = useNavigate();


  const onchange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}
  
  const  handlesubmit=async (e)=>{
    e.preventDefault()
    const response = await fetch(`https://note-backends.herokuapp.com/api/auth/login`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
       },
       body: JSON.stringify({email:credentials.email,password:credentials.password}),
      
    });
    const json=await response.json();
 

    if(json.sucess){
      localStorage.setItem('token',json.authtoken);
      navigate('/')
      showalert("Sucessfully Signed up","success")

    }
    else{
 
      showalert("Invalid details","danger")
    }
  }
  return (
    <div className="signup">
    <form className="signupbox" onSubmit={handlesubmit}>
      <h1 className="signup-title">Login</h1>
      <div className="signup-inputcontainer">
        <div>

        <label htmlFor='email' className="inp-component">
          <input placeholder="Email" name='email' id='email' onChange={onchange} value={credentials.email} aria-describedby='email' className="signup-input" type="Email" />
        </label>
        </div>
        <div>
        <label htmlFor='password' className="inp-component">
          <input placeholder="Password" id='password' name='password' onChange={onchange} value={credentials.password} className="signup-input" type="password" />
        </label>

        </div>
      </div>
      <p className="signup-desc">
        Doesn't have an account <Link to="/Signup">Sign up</Link>{" "}
      </p>
      <button className="signup-btn" type='submit' >Login</button>
    </form>
    </div>
  )
}

export default Login;
