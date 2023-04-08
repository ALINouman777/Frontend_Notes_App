import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/SignUp.scss";
import axios from 'axios';
import toast from "react-hot-toast"
import CreateContext from '../Context/createContext';


const Signup = () => {
  const navigate = useNavigate();
  const { loading, setloading, setisAuth } = useContext(CreateContext)

  const [input, setinput] = useState({
    name: "",
    email: "",
    password: ""
  })


  const handleChange = (e) => {
    setinput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleClick = async (e) => {

    e.preventDefault();
    setloading(true)
    try {
      const { data } = await axios.post("https://notes-app-7g2s.onrender.com/user/signup", {
        name: input.name,
        email: input.email,
        password: input.password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      
      setisAuth(false)
      setinput({
        name: "",
        email: "",
        password: ""
      })
      setloading(false)
      navigate('/login')

    } catch (error) {
      toast.error("Invalid")
      setloading(false)
      setisAuth(false)
    }
  }

  return (
    <div className='signup' >
      <main>
        <h1>SignUp to NotesApp</h1>
        <form onSubmit={handleClick}>
          <input
            type="text"
            name="name"
            value={input.name}
            id="text"
            placeholder='Name'
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            value={input.email}
            id="email"
            placeholder='email'
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            value={input.password}
            placeholder='passowrd'
            onChange={handleChange}
          />
          <div className="button">
            <button disabled={loading}>SignUp</button>
          </div>
        </form>
        <div>
          <p>Or</p>
          <Link to={"/login"}>LogIn</Link>
        </div>
      </main>
    </div>
  )
}

export default Signup
