import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/App.css';
import './style/common.css'
import {WiCloudyWindy} from 'react-icons/wi';

import WrongPage from './components/WrongPage';
import Whether from './components/Whether';
import FavorPage from './components/FavorPage';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


function App() {
  
// date / day
  const current = new Date();
   const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   var d = new Date();
   var dayName = days[d.getDay()];
//////////////////////////////////
  const [FartesSaves, setFartesSave] = useState([]);
  const [FartesCity, setFartesCity] = useState('');
  function AddFarte(city,textW,valW)
  {
    
    setFartesSave([...FartesSaves,{CityName:city,TextWhe:textW,Temp:valW}])
  }
  const deleteFart = faritem => setFartesSave(
    FartesSaves.filter((fart) => fart !== faritem)
  );

  function PostFart(cityF)
  {
    setFartesCity(cityF)
  }
  
  return (
    <div className="App">
     <h1 style={{  color:"#53b2e3",fontSize: "2.3em",paddingTop:'10px'}}><WiCloudyWindy style={{fontSize: "3em"}}/><br/>Whether App</h1>

     <Router>
      <Routes>
      <Route  path='/' element={<Whether AddFarte={AddFarte} FartesCity={FartesCity} />}/> 
      <Route  path='/Save' element={<FavorPage FartesSaves={FartesSaves} deleteFart={deleteFart} PostFart={PostFart} />}/>
      <Route  path='/*' element={<WrongPage/>}/>
      </Routes>
      </Router>
      <br />
      <footer >
        <h3 color='red'>{date},{dayName}</h3></footer>
    </div>
  );
}

export default App;
