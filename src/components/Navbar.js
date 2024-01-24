import React from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";


const Navbar = () => {
  let navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    alert("User Logout")
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Document Editor</Link>
          <button
            className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            {!localStorage.getItem("token") ? <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-2" to="/login" role="button"> Login </Link>
            <Link className="btn btn-primary mx-2" to="/register" role="button"> Register </Link>
            </form>:<button className="btn btn-primary mx-2" onClick={handleLogout}> Logout </button> }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;