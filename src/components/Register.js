
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    lastname: "",
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { username, lastname, email, password } = credentials;


    try {
      // Sending signup request
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          lastname,
          email,
          password
        }),
      });

      const json = await response.json();
      // console.log(json);

      // Handle response
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        alert("Your Account Created Successfully");
        navigate('/');
      } else {
        alert("Something went wrong! Please Try Again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
        <form className="form mx-auto" onSubmit={handleOnSubmit}>
          <h2 className="form-title text-center"> SignUp</h2>
            <div className="mb-3 mt-5">
              <input type="text" name="username" onChange={onChange} id="username" className="my-3 form-control" placeholder="Username" aria-label=" Username" required />
            </div>
            <div className="mb-3">
              <input type="text" name="lastname" onChange={onChange} id="lastname" className="my-3 form-control" placeholder="Last name" aria-label="Last name" />
            </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" onChange={onChange} id="email" placeholder="Enter Your Email" required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" onChange={onChange} id="password" placeholder="Enter Password" minLength={5} required />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" onChange={onChange} id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                I accept the Terms of Use & Privacy Policy
              </label>
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="btn button my-3">Sign in</button>
          </div>
        </form>
  </div>
  );
};

export default Register;