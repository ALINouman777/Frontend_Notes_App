import React, { useEffect, useContext } from 'react';
import { Routes, Route } from "react-router-dom"
import './Styles/App.scss'
import Login from './assets/Login';
import Notes from "./assets/Notes";
import Signup from "./assets/Signup"
import Header from './assets/Header';
import ContextApi from './Context/createContext';
import { Toaster } from "react-hot-toast"
import axios from 'axios';
import About from "./assets/About"


function App() {
  const { isAuth, setisAuth } = useContext(ContextApi)

  useEffect(() => {
    axios.get("https://notes-app-7g2s.onrender.com/user/me", {
      withCredentials: true,
    }).then((res) => {
      const data = res.data.success
      if (!data) {
        return setisAuth(false);
      }
      setisAuth(true)
    }).catch(() => {
      return setisAuth(false);
    })

  }, [isAuth])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Notes />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
