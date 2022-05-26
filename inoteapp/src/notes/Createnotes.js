import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/notecontext'
import Yournotes from './Yournotes';


const Createnotes = (props) => {
    const context=useContext(NoteContext);
    const {addnote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault()
        addnote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showalert("added sucessfully","success")
    }

    const onchange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

  return (
    <div className='container my-3'>
      <h1>Add notes</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" minLength={5} required name='title' value={note.title} id="title" aria-describedby="emailHelp" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" minLength={5} required name='description' value={note.description} id="description" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" minLength={5} required name='tag' value={note.tag} id="tag" onChange={onchange}/>
  </div>
  
  <button type="submit" disabled={note.title.length<3 ||note.description.length<5} className="btn btn-primary" onClick={handleclick}>Add note</button>
</form>

    </div>
  )
}

export default Createnotes
