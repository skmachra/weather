import React, { useState, useEffect } from 'react';

const CurrentDateTime = () => {
    const [dateTime, setDateTime] = useState(getFormattedDateTime());

    // Function to get formatted date and time
    function getFormattedDateTime() {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return now.toLocaleDateString('en-US', options) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).replace(/^0+/, '');
    }

    useEffect(() => {
        // Update the date and time every minute
        const intervalId = setInterval(() => {
            setDateTime(getFormattedDateTime());
        }, 60000); // 60000 ms = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return dateTime
};

export default CurrentDateTime;
