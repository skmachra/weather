import React from "react";

function epochToLocalTime(epochTimestamp) {
    const date = new Date(epochTimestamp * 1000);

    // Options for date and time formatting
    const options = {
        weekday: 'short',    // 'Sat'
        month: 'short',       // 'Aug'
        day: 'numeric',      // '3'
        hour: 'numeric',     // '4'
        minute: 'numeric',   // '43'
        hour12: true         // 'AM' or 'PM'
    };

    // Format the date using the specified options
    return date.toLocaleString('en-US', options);
}


export default epochToLocalTime;