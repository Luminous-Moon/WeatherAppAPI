//Tutorial followed: https://youtu.be/UjeXpct3p7M?si=DEnaVGJSo67XUhLo
//RADona 14/11/2023

import React, { useState } from 'react'
import axios from 'axios'
import function App() {

    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a6f0fd98dfa9af51e3d59f9d98bea9f2`
    //${} s a dynamic value

    const searchLocation = (event) => {

        if (event.key === "Enter") { //enter key
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            }) //gets location from user input

            setLocation = (' ')

        }
    }


    return (
        <div className="app">

            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation} //when press enter key search for location
                    placeholder="Enter Location"
                    type="text" />

            </div>

            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p> //gets name from API
                    </div>
                </div>
                <div className="temp">
                    {data.main ? <h1> {data.main.temp.toFixed()}</h1> : null} //toFixed make whole number
                //calls main if it exists then call temp else null.
                //if u do data.main.temp normally itll try and call temp first causing a not defined error
                </div>
                <div className="description">
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>

                {data.name != undefined &&
                    //if theres no location name dont show the humidity and wind speed and stuff.
                    <div className="bottom">
                        <div className="feels">
                            <p>Feels like</p>
                            {data.main ? <p className='bold'> {data.main.feels_like.toFixed()}</p> : null}
                        </div>

                        <div className="humidity">
                            <p>Humidity</p>
                            {data.main ? <p className='bold'> {data.main.humidity}%</p> : null}
                        </div>

                        <div className="wind">
                            <p> Wind Speed</p>
                            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}</p> : null}
                        </div>
                    </div>
                }

            </div>
        </div>
    );
}
export default App;
