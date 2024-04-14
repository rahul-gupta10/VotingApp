import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './component/navbar';
import Home from './component/home';
import ViewVotes from './component/viewVotes'
import Voting from './component/voting'
import Login from './component/Login';
import Signup from './component/Signup';
import UpdateProfile from './component/UpdateProfile';
import PasswordChange from './component/PasswordChange';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route index element={<Home />} />
          <Route path="/viewvote" element={<ViewVotes />}/>
          <Route path="/voting" element={<Voting />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/updateprofile" element={<UpdateProfile />}/>
          <Route path="/changePassword" element={<PasswordChange />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
