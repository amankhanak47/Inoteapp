import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/notecontext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import "./noteitem.css"

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deletenote } = context;


  return (
    <div className="noteitem">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <div className="header-personal">

            <h3 className="card-title overflow-p">{props.note.title}</h3>
            <div className="left-header">

            <Button onClick={()=>{props.updatenote(props.note)
             }}>
              <EditIcon fontSize="large" className="mx-2" />
            </Button>

            <Button
              onClick={() => {
                deletenote(props.note._id);
                props.alerts("deleted sucessfully","success")
              // console.log("jb kjb")
              }}
            >
              <DeleteForeverIcon fontSize="large" className="mx-2" />
            </Button>
            </div>
            </div>
          </div>
          <p className="card-text overflow-p">{props.note.description}</p>
          <p className="card-text overflow-p">{props.note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
