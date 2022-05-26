import React from 'react'
import Createnotes from '../notes/Createnotes'
import Yournotes from '../notes/Yournotes'

const Home = ({showalert}) => {
  return (
    <div>
     <Yournotes showalert={showalert}/>
      {/* <Createnotes/> */}
    </div>
  )
}

export default Home
