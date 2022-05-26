import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NoteState from "./Context/notes/notestate";
import Yournotes from "./notes/Yournotes";
import Createnotes from "./notes/Createnotes";
import Alert from "./components/Alert";
import { useState } from "react";
import Noteitem from "./notes/Noteitem";

function App() {
  const [alert,setAlert]=useState(null)

  const showalert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }
  return (
    <div className="App">
      <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        {/* <Yournotes showalert={showalert}/> */}
        <Routes>
          <Route path="/signup" element={<Signup showalert={showalert}/>}/>
          <Route path="/login" element={<Login showalert={showalert} />}/>
          {/* <Route path="/yournotes" element={<Yournotes showalert={showalert}/>}/> */}
          <Route exact path="/" element={<Yournotes showalert={showalert}/>}/>
          {/* <Route path="/" element={[<Home showalert={showalert} />]} /> */}
          <Route path="/about" element={<About />} />
          {/* <Route path="/kjsankjadnkasjdnjkadsb" element={<Noteitem  showalert={showalert}/>} /> */}
        </Routes>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
