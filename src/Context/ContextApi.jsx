import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateContext from './createContext';


const ContextApi = ({ children }) => {


  const [isAuth, setisAuth] = useState(false);
  const [loading, setloading] = useState(false);
  const [dataArr, setdataArr]=useState([])
  const [shownotes, setshowntoes]=useState(false);
  const [afterupdate, setafterupdate]=useState(false)

  useEffect(() => {
    const fetchdata = async () => {
     const {data}= await axios.get("https://notes-app-7g2s.onrender.com/task/my",
        {
          headers: {
            "Content-Type": "application/json",
          },
        withCredentials: true,
        });
        if(data.task){
          return setdataArr(data.task)
        }
    }

    fetchdata();

  }, [shownotes,isAuth,afterupdate, dataArr])

  return (
    <CreateContext.Provider value={{
      isAuth,
      loading,
      setloading,
      setisAuth,
      dataArr,
      setshowntoes,
      setafterupdate,
      afterupdate,
      
    }}>
      {children}
    </CreateContext.Provider>
  )
}

export default ContextApi
