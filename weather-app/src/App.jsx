import React, { useState } from 'react'
import TopButton from "./components/TopButtons"
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TempAndDetails from './components/TempAndDetails'
import Forecast from './components/Forecast'
import getWeatherData from './services/weatherService'
import getFormattedWeatherData from './services/weatherService'
import { useEffect } from 'react'
const App = () => {

  const [query,setQuery]=useState({q:"delhi"})
  const [units,setUnits]=useState('metric')
  const [weather,setWeather]=useState(null)
  const getWeather = async() => { 
    await getFormattedWeatherData({...query,units}).then((data) => {
      setWeather(data)
    });
    // console.log(weather);
  };
  useEffect(()=>{getWeather();},[query,units]);
  const formatBackground = () =>
  {
    if(!weather)
      return "from-cyan-600 to-blue-700";
    const threshold= units === "metric" ? 20:60;
    if(weather.temp <= threshold )
      return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  }
  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 $ ${formatBackground()}`}>
      <TopButton setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnits={setUnits}/>
    { weather && (
      <>
      <TimeAndLocation weather={weather}/>
      <TempAndDetails weather={weather}/>
      <Forecast title='3 Hour Step forecast' data={weather.hourly}/>
      <Forecast title="Daily foreast" data={weather.daily}/>
      </>
    )}
      </div>
    
  )
}

export default App