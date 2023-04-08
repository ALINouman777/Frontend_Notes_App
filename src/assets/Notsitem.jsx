import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import Context from "../Context/createContext"

const Notesitem = ({ item, updateNote,setshowupdate , setinput}) => {
  const [loading, setloading] = useState(false)
  const { setshowntoes } = useContext(Context)

  const handledel = async (key) => {
    setloading(true)
    setshowupdate(false)
    setinput({
      title:"",
      description:""
    })
    try {

      const { data } = await axios.delete(`https://notes-app-7g2s.onrender.com/task/${key}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      setloading(false)
      toast.success(data.message)
      setshowntoes(prev => !prev)
    } catch (error) {
      toast.error("failed to delete")
      setloading(false)
    }
  }




  return (
    <div className='NotesItem'>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      <div className="btns">
        <button
          disabled={loading}
          onClick={() => updateNote(item)}
        >Update</button>
        <button
          disabled={loading}
          onClick={() => handledel(item._id)} >Delete</button>
      </div>
    </div>
  )
}

export default Notesitem
