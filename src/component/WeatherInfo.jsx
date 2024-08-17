import { useState, useEffect } from "react";
import App from "../App";
import LocationComponent from "./Location";

const WeatherInfo = (lat, lon) => {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (lat != null && lon != null) {
            const fetchData = async () => {
                setIsLoaded(false);
                setError(null);
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f17c90217c611843ae740c97e0a741b6`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setData(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoaded(true);
                }
            };

            fetchData();
        }
    }, [lat, lon]);

    return { data, isLoaded, error };
};

export default WeatherInfo;

