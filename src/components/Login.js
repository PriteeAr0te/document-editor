import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({username:"", password:""})

  // replacing useHistory hook in v5 with useNavigate 
  let navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
       try{
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username:credentials.username, password:credentials.password}),
        });
        const json = await response.json();
        // console.log(json)
        if(json.success){
          //redirect
          localStorage.setItem('token', json.authtoken)
          alert("Login Successfull")
          navigate('/')
        }
        else{
          alert("Invalid Username or Password")
        }
       }
       catch(error){
        console.error(error);
       }
      }

      const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

  return (
    <div className="container mt-3">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Username: </label>
            <input type="text" className="form-control"  name="username"
            onChange = {onChange} value = {credentials.username} id="username" placeholder="Enter Username" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password"
            onChange = {onChange} value = {credentials.password} id="password" placeholder="Enter password" required/>
          </div>
          <button type="submit" className="btn btn-primary my-3">Login</button>
          <button type="button" className="btn btn-primary my-3 mx-3">Close</button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;

