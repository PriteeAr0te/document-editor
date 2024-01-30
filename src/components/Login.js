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
    <div className="container-fluid">
        <form className="form mx-auto" onSubmit={handleSubmit}>
          <h2 className=' form-title text-center'>Login</h2>
          <div className="mb-3 mt-5">
            <label className="form-label fw-semibold" htmlFor="email"> <i className="fa-solid fa-user"></i><span className='ml-3'> Username  </span></label>
            <input type="text" className="form-control"  name="username"
            onChange = {onChange} value = {credentials.username} id="username" placeholder="Enter Username" required/>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="password"> <i className=" mr-2 fa-solid fa-unlock-keyhole"></i><span className='ml-3'> Password</span></label>
            <input type="password" className="form-control" name="password"
            onChange = {onChange} value = {credentials.password} id="password" placeholder="Enter password" required/>
          </div>
          <button type="submit" className="btn button my-3">Login</button>
          <button type="button" className="btn button my-3 mx-3 ">Close</button>
        </form> 
  </div>
  );
};

export default Login;

