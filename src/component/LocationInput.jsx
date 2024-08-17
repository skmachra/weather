import React, { useState } from 'react';

// Function to fetch location data based on city name
const FetchLocationByCity = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=f17c90217c611843ae740c97e0a741b6`);
    if (!response.ok) {
        throw new Error('City not found');
    }
    const data = await response.json();
    if (!data?.length) {
        throw new Error('City not found');
    }
    return {
        latitude: data?.[0]?.lat,
        longitude: data?.[0]?.lon
    };

};

export default FetchLocationByCity