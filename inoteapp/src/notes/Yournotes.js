import React, { useContext, useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from '../Context/notes/notecontext'
import Createnotes from "./Createnotes";
import Noteitem from "./Noteitem";

const Yournotes = (props) => {
  const Context = useContext(NoteContext);
  const { notes, getnotes} = Context;
  let navigate = useNavigate();
  const {editnote}=Context;
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes();
    }
    else{
      navigate('/login')
      
    }
  }, []);

const ref=useRef(null)
const refclose=useRef(null)
  const updatenote = (currentnote) => {
    ref.current.click();
   setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
 
  };

  const handleclick=(e)=>{
    // console.log("upfating the note", note)
    refclose.current.click()
    editnote(note.id,note.etitle,note.edescription,note.etag)
    props.showalert("Updated sucessfully","success")
    e.preventDefault()
    // console.log(note)

}

const onchange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})
    
}




  return (
    <div className="container">
      <div className="row mx-3">
      <Createnotes showalert={props.showalert}/>


      </div>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Upfa</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" value={note.etitle} minLength={5} required name='etitle' id="etitle" aria-describedby="emailHelp" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" value={note.edescription} minLength={5} required name='edescription' id="edescription" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" value={note.etag} minLength={5} required name='etag' id="etag" onChange={onchange}/>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={ note.etitle.length<3 ||note.edescription.length<5} onClick={handleclick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3 mx-3">
        <h1>Your notes</h1>
        {notes.length===0&&<h4 className="container mx-3 my-3">No notes to display 🤔</h4>}
        {notes.map((note) => {
          return (
            <Noteitem alerts={props.showalert} key={note._id} updatenote={updatenote} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Yournotes;
