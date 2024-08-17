import { useState, useEffect } from 'react'
import './App.css'
import WeatherInfo from './component/WeatherInfo'
import LocationComponent from './component/Location'
import epochToLocalTime from './component/Time'
import FetchLocationByCity from './component/LocationInput'
import Nav from './component/Nav'
import humidity from '/src/assets/humidity.png'
import wind from '/src/assets/wind.png'

function App() {
    const [location, setlocation] = useState({})
    const { location: currentLocation, error: locationError, loading: locationLoading } = LocationComponent();
    const [city, setCity] = useState('');
    const { data: weatherData, isLoaded: weatherLoaded, error: weatherError } = WeatherInfo(location?.latitude, location?.longitude);

    const handleCitySearch = async (city) => {
        try {
            const newLocation = await FetchLocationByCity(city);
            setCity(city);
            setlocation(newLocation);
        } catch (error) {
            console.error('Error fetching location by city:', error);
        }
    };
    useEffect(() => {
      if (currentLocation) {
          setlocation(currentLocation);
      }
  }, [currentLocation]);

    if (locationLoading) {
        return <div>Loading your location...</div>;
    }

    if (locationError) {
        return <div>Error fetching location: {locationError}</div>;
    }

    if (!weatherLoaded) {
        return <div>Loading weather...</div>;
    }

    if (weatherError) {
        return <div>Error fetching weather: {weatherError}</div>;
    }

    if (!weatherData) {
        return <div>No weather data available</div>;
    }

    

    const formatCurrentDateTime = () => {
        const now = new Date();
    
        // Define options for formatting
        const dayOptions = { weekday: 'short' }; // 'Sat'
        const monthOptions = { month: 'short' }; // 'Aug'
        const dayOfMonthOptions = { day: 'numeric' }; // '5'
        const timeOptions = { hour: '2-digit', minute: '2-digit' }; // '13:00'
    
        // Format the components
        const dayOfWeek = now.toLocaleDateString('en-US', dayOptions);
        const month = now.toLocaleDateString('en-US', monthOptions);
        const dayOfMonth = now.toLocaleDateString('en-US', dayOfMonthOptions);
        const time = now.toLocaleTimeString('en-US', timeOptions).replace(/^0+/, '');
        return `${dayOfWeek}, ${month} ${dayOfMonth}, ${time}`;


  }

  return (
    <>
    <Nav onCitySearch={handleCitySearch} />
    <main className="container mx-auto p-4">
            <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <div className='ml-4 mb-2'>
                   {formatCurrentDateTime()}
                  </div>
                <div className="flex items-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                        alt="Weather Icon"
                        className="w-20 h-20"
                    />
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold">{weatherData?.city?.name}</h2>
                        <p className="text-xl">{Math.round(weatherData?.list?.[0]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-600">{weatherData?.list?.[0]?.weather?.[0]?.main}</p>
                    </div>
                    <div className='m-auto'>
                      <p className='pb-4 text-2xl flex'><img className='h-9' src={humidity}/> Humidity</p>
                      <p className='text-xl pl-9'>{weatherData?.list?.[0]?.main?.humidity}%</p>
                    </div>
                    <div className=''>
                      <p className='pb-4 text-2xl flex'><img className='h-9 mr-2' src={wind}/>  Wind Speed</p>
                      <p className='text-xl pl-11'>{weatherData?.list?.[0]?.wind?.speed} Km/h</p>
                    </div>
                </div>
            </section>

            {/* 8-Hour Forecast */}
            <section>
                <h2 className="text-xl font-bold mb-4">Next</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Hourly Forecast Item */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600 text-sm">{epochToLocalTime(weatherData?.list?.[1]?.dt)}</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                            alt="Weather Icon"
                            className="w-12 h-12 my-2"
                        />
                        <p className="text-lg font-semibold">{Math.round(weatherData?.list?.[1]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-500">{weatherData?.list?.[1]?.weather?.[0]?.main}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600 text-sm">{epochToLocalTime(weatherData?.list?.[2]?.dt)}</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                            alt="Weather Icon"
                            className="w-12 h-12 my-2"
                        />
                        <p className="text-lg font-semibold">{Math.round(weatherData?.list?.[2]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-500">{weatherData?.list?.[2]?.weather?.[0]?.main}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600 text-sm">{epochToLocalTime(weatherData?.list?.[3]?.dt)}</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                            alt="Weather Icon"
                            className="w-12 h-12 my-2"
                        />
                        <p className="text-lg font-semibold">{Math.round(weatherData?.list?.[3]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-500">{weatherData?.list?.[3]?.weather?.[0]?.main}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600 text-sm">{epochToLocalTime(weatherData?.list?.[4]?.dt)}</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                            alt="Weather Icon"
                            className="w-12 h-12 my-2"
                        />
                        <p className="text-lg font-semibold">{Math.round(weatherData?.list?.[4]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-500">{weatherData?.list?.[4]?.weather?.[0]?.main}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600 text-sm">{epochToLocalTime(weatherData?.list?.[5]?.dt)}</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                            alt="Weather Icon"
                            className="w-12 h-12 my-2"
                        />
                        <p className="text-lg font-semibold">{Math.round(weatherData?.list?.[5]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-500">{weatherData?.list?.[5]?.weather?.[0]?.main}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600 text-sm">{epochToLocalTime(weatherData?.list?.[6]?.dt)}</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                            alt="Weather Icon"
                            className="w-12 h-12 my-2"
                        />
                        <p className="text-lg font-semibold">{Math.round(weatherData?.list?.[6]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-500">{weatherData?.list?.[6]?.weather?.[0]?.main}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600 text-sm">{epochToLocalTime(weatherData?.list?.[7]?.dt)}</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                            alt="Weather Icon"
                            className="w-12 h-12 my-2"
                        />
                        <p className="text-lg font-semibold">{Math.round(weatherData?.list?.[7]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-500">{weatherData?.list?.[7]?.weather?.[0]?.main}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-gray-600 text-sm">{epochToLocalTime(weatherData?.list?.[8]?.dt)}</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg"
                            alt="Weather Icon"
                            className="w-12 h-12 my-2"
                        />
                        <p className="text-lg font-semibold">{Math.round(weatherData?.list?.[8]?.main?.temp - 273.15)}°C</p>
                        <p className="text-gray-500">{weatherData?.list?.[8]?.weather?.[0]?.main}</p>
                    </div>
                    
                    {/* Add more hourly forecast items as needed */}
                </div>
            </section>
        </main>
    </>
  )
}

export default App
