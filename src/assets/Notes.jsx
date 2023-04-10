import React, { useState, useContext } from 'react';
import '../Styles/Notes.scss';
import Notesitem from "../assets/Notsitem";
import axios from 'axios';
import toast from "react-hot-toast"
import ContextApi from "../Context/createContext"

const Notes = () => {

  const { afterupdate, dataArr, setshowntoes, setafterupdate } = useContext(ContextApi)


  const [startupdate, setstartupdate] = useState(false);
  const [Key, setkey] = useState("")
  const [input, setinput] = useState({
    title: "",
    description: ""
  })
  const [loading, setloading] = useState(false)
  const [showupdate, setshowupdate] = useState(false)

  function handleChange(e) {

    setinput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    });

  }


  // *****
  const updateNote = (item) => {
    setstartupdate(true)
    setshowupdate(true)
    setafterupdate(true)
    setkey(item._id)
    setinput(() => {
      return {
        title: item.title,
        description: item.description
      }
    })
  }
  // ******

  // *****
  const updateNote2 = async (e) => {
    e.preventDefault();
    setafterupdate(false);
    setloading(true);
    try {
      const { data } = await axios.put(`https://notes-app-7g2s.onrender.com/task/update/${Key}`,
        {
          title: input.title,
          description: input.description
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        });
      setinput({
        title: "",
        description: ""
      })
      setloading(false)

      toast.success(data.message);
    } catch (error) {
      toast.error("Fail to update");
    }
  }

  async function addNote(e) {
    e.preventDefault();
    setafterupdate(false);
    setloading(true);
    try {
      const { data } = await axios.post("https://notes-app-7g2s.onrender.com/task/add", {
        title: input.title,
        description: input.description
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("Note is added");
      setinput({
        title: "",
        description: ""
      });
      setloading(false);
      setshowntoes(prev => !prev)
    } catch (error) {

      console.error(error);
      setloading(false);
      toast.error("Fail to Add Note");

    }
  };

  const elem = dataArr.map((item) => {
    return <Notesitem
      key={item._id}
      item={item} updateNote={updateNote}
      setshowupdate={setshowupdate}
      setinput={setinput} />
  })


  return (
    <div className='Notes'>
      <main>
        <h1>Add Notes</h1>
        <form >

          <input
            type="text"
            name="title"
            placeholder='Title'
            value={input.title}
            onChange={handleChange}
            id="title"
            required
          />

          <input
            type="text"
            name="description"
            id="description"
            value={input.description}
            placeholder='Description'
            onChange={handleChange}
            required
          />
          {afterupdate === false ? <button disabled={loading} onClick={addNote}>
            Add Note
          </button> : <button disabled={loading} onClick={updateNote2}>
            Update Note
          </button>}
        </form>
      </main>

      <br />
      <br />
      <hr />

      <div className='flexdiv'>
        {elem}
      </div>
    </div>
  )
}

export default Notes
