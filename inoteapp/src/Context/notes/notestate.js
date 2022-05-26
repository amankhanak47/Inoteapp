import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = "https://note-backends.herokuapp.com";
  const notesinitial = [];

  const [notes, setNotes] = useState(notesinitial);
  
  

   //get all note
   const getnotes = async () => {
    
    //api calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();
// console.log(json)
setNotes(json)
  };

  
  

  //add a note
  const addnote = async (title, description, tag) => {
    
    //api calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note = await response.json(); 
    setNotes(notes.concat(note));
  };







  //delete a note
  const deletenote = async (id) => {
    //api calls

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = response.json();
    // console.log(json)
    // console.log(response)



    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
    // console.log(notes)
  };









  //edit a note'
  const editnote = async (id, title, description, tag) => {
    //api calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();
    // console.log(json)
    
    
     const  newNotes = notes.map(note => {
        if (note._id === id) {
            return {...note , title , description , tag} ;
        }
        return note;
    });
    // logic to edit in client
    setNotes(prev => newNotes);

    

    // setNotes(notes)
  };




  return (
    <NoteContext.Provider value={{ notes, addnote, editnote, deletenote,getnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};




export default NoteState;
