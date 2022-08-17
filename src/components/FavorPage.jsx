import React from 'react'
import {AiFillHome} from 'react-icons/ai';
import {BsBookmarkStarFill} from 'react-icons/bs';
import {TiDelete} from 'react-icons/ti';
import {Link,useNavigate} from 'react-router-dom';//use to for links

export default function FavorPage(props) {
  const navigate=useNavigate();
  const SaveCityFart=(FartCity)=>{
    props.PostFart(FartCity);
    navigate("/")
  }
  return (
    <div>
      <div className='icons-sec'>
      <Link  role="button" to="/" ><AiFillHome className='icons' /></Link>
      <Link  role="button" to="/Save" ><BsBookmarkStarFill className='icons'/></Link>   
     </div>
    <br/><h1>FavorPage</h1>
    <div className="Cards-sec">
        {props.FartesSaves.map((Fart, idx) => (
          <div onClick={() => SaveCityFart(Fart.cityName)} key={idx} style={{background: "#f5f7fa",color:"white",width:"300px",height:"210px",borderRadius:"15px 20px"}}>
           <div>{Fart.cityName}</div> 
           <p>{Fart.TextWhe}</p>
           <h1>{Fart.Temp}</h1>
           <TiDelete onClick={() => props.deleteFart(Fart)} style={{color:"#53b2e3" ,width:"36px",height:"36px"}}/>
          </div>
        ))}
       <br/><br/>
      </div>
    </div>
  )
}
