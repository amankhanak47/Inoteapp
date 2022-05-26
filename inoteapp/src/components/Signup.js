import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./signup.css";
const Signup = ({showalert}) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  let navigate = useNavigate();

  const  handlesubmit=async (e)=>{
    e.preventDefault()
    const {name,email,password,cpassword}=credentials;
    const response = await fetch(`https://note-backends.herokuapp.com/api/auth/createuser`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
       },
       body: JSON.stringify({name, email,password}),
      
    });
    const json=await response.json();
    // console.log(json)
    if(json.sucess){
      localStorage.setItem('token',json.authtoken);
      navigate('/')
      showalert("Sucessfully Signed up","success")

    }
    else{
      showalert("Invalid Credentials","danger")
    }
  }

  const onchange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}


  return (
    <div className="signup">
      <form className="signupbox" onSubmit={handlesubmit}>
        <h1 className="signup-title">Sign Up</h1>
        <div className="signup-inputcontainer">
          <label htmlFor="name" className="inp-component">
            <input placeholder="Name" className="signup-input" id="name" onChange={onchange} name="name" type="text" />
          </label>
          <label htmlFor="email" className="inp-component">
            <input placeholder="Email" name="email" className="signup-input" onChange={onchange} id="email" type="Email" />
          </label>
          <label htmlFor="password" className="inp-component">
            <input placeholder="Password" className="signup-input" name="password" minLength={3} required onChange={onchange} id="password"  type="password" />
          </label>
          <label htmlFor="cpassword" className="inp-component">
            <input placeholder="Confirm Password" className="signup-input" name="cpassword" onChange={onchange} id="cpassword" type="password" />
          </label>
        </div>
        <p className="signup-desc">
          Already a member? <Link to="/login">Log in</Link>{" "}
        </p>
        <button type="submit" className="signup-btn">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
