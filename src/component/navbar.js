import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  let history = useNavigate();

  function logout() {
    sessionStorage.removeItem("authtoken")
    sessionStorage.removeItem("username")
    history('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Voting App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav" style={{width: '100%' }}>
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/viewvote">View Votes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/voting">Voting</Link>
            </li>
            {
              !sessionStorage.getItem('username') ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
                : null
            }

            <li className="nav-item dropdown " style={{ position: 'absolute', right: '30px' }}>
              {sessionStorage.getItem('username') ? (
                <div className="dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hi {sessionStorage.getItem('username')}  </Link>                
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to='/updateprofile'>Update Profile</Link></li>
                    <li><Link className="dropdown-item" to="/changePassword">Change Password</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button  className="dropdown-item" onClick={logout}>Logout</button></li>
                  </ul>
                  
                </div>
              ) : null}
            </li>

          </ul>
        </div>
      </div>
    </nav >
  );
}

export default Navbar;
