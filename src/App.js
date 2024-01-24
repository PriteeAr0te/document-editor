
import React, { useState, useEffect } from 'react';
import './App.css';
import DocumentEditor from './components/DocumentEditor';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <div className="container my-3">
      <Routes>
        <Route path="/" element={<DocumentEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;