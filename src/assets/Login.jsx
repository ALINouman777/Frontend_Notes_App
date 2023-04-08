import React, { useContext, useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CreateContext from '../Context/createContext';
import "../Styles/Login.scss";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  const {isAuth, setisAuth} = useContext(CreateContext)
  
  const [input, setinput] = useState({
    email: "",
    password: ""
  });
  const[loading, setloading]= useState(false)

  function handleChange(e) {
    setinput((prev) => {
      return ({
        ...prev,
        [e.target.name]: e.target.value
      })
    })
  }

  const handleClick =async (e) => {
    e.preventDefault();

    setloading(true)

    try {
      const { data } = await axios.post("https://notes-app-7g2s.onrender.com/user/login", {
      email: input.email,
      password: input.password
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    
    setisAuth(true)
    setinput({
      email:"",
      password:""
    })

    toast.success("logged In successfully")
    setloading(false)

    } catch (error) {
      setisAuth(false)
      setloading(false)
      toast.error("Invalid Credentials")
    }
  }

useEffect(()=>{
  if(isAuth){
    return navigate("/")
  }
},[isAuth])
  return (
    <div className='Login'>
      <main>

        <h1>Login To NotesApp</h1>

        <form onSubmit={handleClick}>
          <input
            type="email"
            name="email"
            id="name"
            placeholder='email'
            value={input.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            value={input.password}
            id="password"
            placeholder='password'
            onChange={handleChange}
            required
          />
          <button disabled={loading}>Login</button>

        </form>

        <div>
          <p>Or</p>
          <Link to={"/signup"}>SignUP</Link>
        </div>

      </main>
    </div>
  )
}

export default Login
