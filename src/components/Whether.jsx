import React,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {BsBookmarkStarFill} from 'react-icons/bs';

export default function Whether(props) {
  const [City, setCity] = useState('Tel Aviv');
  const [CityData, setCityData] = useState([]);
  const [WhetherD, setWhetherD] = useState([]);
  const [Forecasts, setForecasts] = useState([]);
  const apiCode='Axvmfn8zsG35lJTIklUPszbedjABNRXX';
  const cityUrl = "//dataservice.accuweather.com/locations/v1/cities/autocomplete";
  const WeatherUrl = "https://dataservice.accuweather.com/currentconditions/v1/";
  const FrocstUrl="http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  //data for whether and 
  //////////////////////
  const CardWh = document.getElementById('CardWhe');
  const CardFore5 = document.getElementById('CardForecast');
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  

  const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    const Forecast = await getForecast(cityDets.Key);
    return { cityDets, weather,Forecast}
  
  };
  useEffect(()=>{
    updateCity(City)
    .then(viewData => setDataview(viewData))
    .catch(err => console.log(err));
  },[City])

  /// get finail data for View 
  const setDataview=(viewData)=>{

  if(CardWh.classList.contains('disp-non')){
      CardWh.classList.remove('disp-non');
  }
  else if(CardFore5.classList.contains('disp-non')){
    CardWh.classList.remove('disp-non');
  }
  setCityData(viewData.cityDets)
  setWhetherD(viewData.weather);  
  setForecasts(viewData.Forecast);
  }
  const getCitySumbit= (e) =>{
    //e.preventDefault(); 
    const valInput=e.target.value;
    const Fcity=props.FartesCity;
    if(!(valInput>='a' && valInput<='z' ||valInput>='A' && valInput<='Z')) {
      alert("Please only Enter just letter!")
      return false
    }
    else if(props.FartesCity!=""){
      setCity(Fcity);
    }
     else{
      setCity(valInput);
      
     }
     
  }
  
   
  const getCity = async (City) => {

    const query = `${cityUrl}?apikey=${apiCode}&q=${City}`;
  
    const response = await fetch(query);
    const data = await response.json();
  
    return data[0];
  
  };

  // get whether by id 
  const getWeather = async (id) => {
  
    const query = `${WeatherUrl}${id}?apikey=${apiCode}`;
  
    const response = await fetch(query);
    const data = await response.json();
  
    return data[0];
  
  };

  // get 5 Forecast days by id 
  const getForecast = async (id) => {
  
    const query = `${FrocstUrl}${id}?apikey=${apiCode}`;
  
    const response = await fetch(query);
    const data = await response.json();
  
    return data[0];
  
  };

  const SaveFart=(Ncity,WetTxt,TempV)=>{
    props.AddFarte(Ncity,WetTxt,TempV);
  }
  
  return (
    <div>
      <div className='icons-sec'>
      <Link  role="button" to="/" ><AiFillHome className='icons' /></Link>
      <Link  role="button" to="/Save"><BsBookmarkStarFill className='icons'/></Link>
     </div><br/>
    <div className="select"><input type="search" id="inputTxt" className="custom-select" value={City}  onChange={getCitySumbit} />
     <br/><div className='disp-non' id="CardWhe">
    
      {WhetherD.map((wh) => (
          <div style={{background:"white",color:"black",width:"300px",height:"210px",borderRadius:"15px 20px",borderColor: "#eeeeee"}}>
           <h5 class="card-title">{CityData.EnglishName}</h5>
           <h1>{wh.WeatherText}</h1>
          <h2>{wh.Temperature.Metric.Value}&deg;C</h2> 
          <button onClick={SaveFart(CityData.EnglishName,wh.WeatherText,wh.Temperature.Metric.Value)} class="btn btn-primary">Save for Fart</button>
          </div>
        ))}  
        </div>
     <div className='disp-non' id="CardForecast">
     {Forecasts.map((df, idx) => (
          <div key={idx} style={{background:"white",color:"white",width:"300px",height:"210px",borderRadius:"15px 20px",borderColor: "#eeeeee"}}>
          <h1>{days[new Date(df.DailyForecasts.Date).getDate]}</h1>
          <div>{df.DailyForecasts.Temperature.Minimum.Value}</div> 
          <h1>{df.DailyForecasts.Day.IconPhrase}</h1>
          </div>
        ))}
    </div>
    </div>
    </div>
  )
}
