import React from 'react'
import {useNavigate} from 'react-router-dom';//use to for links
import {AiFillHome} from "react-icons/ai"
export default function WrongPage() {
    const navigate=useNavigate();
    const home = () => {
        navigate("/")
      }

  return (
    <div>   
    <span className='col'>404 opss!</span> <br></br>
    <span className='col'>Page not found</span><br></br><br></br>
        <AiFillHome className='btn icon-btn' style={{width: "70px" ,height:"60px"}} onClick={home}/>

    </div>
  )
}


