import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Header.scss";
import { useContext } from 'react';
import CreateContext from '../Context/createContext';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
import axios from 'axios';
import { useEffect } from 'react';

const Header = () => {

  const navigate = useNavigate();
  const { isAuth, setisAuth } = useContext(CreateContext);


  const Handlelogout = async (e) => {
    try {

     const {data}= await axios.get("https://notes-app-7g2s.onrender.com/user/logout", {
        withCredentials: true,
      });
      setisAuth(false)
      toast.success("Logged out successfully");

    } catch (error) {
      toast.error("error")
      console.log(error)
      setisAuth(true)
    }
  


  }
  
  useEffect(()=>{
    if (isAuth === false) {
      navigate("/login")
    }
  },[isAuth])

  return (
    <div className='Header'>
      <h1><Link to={isAuth?"/":"/login"}>NotesApp</Link></h1>
      <ul>


       {isAuth===true && <li><Link to="/">Home</Link></li>}


        {isAuth === false ? <li><Link to="/login"> Login</Link>
        </li> :
          <li onClick={Handlelogout}><Link>Logout</Link></li>
        }
        { isAuth === false && <li><Link to={"signup"}>SignUP</Link></li>
         
      }
      <li><Link to={"about"}>About</Link></li>
      </ul>
    </div>
  )
}

export default Header
