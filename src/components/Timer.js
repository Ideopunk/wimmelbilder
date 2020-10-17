import React, { useState, useEffect } from "react";

const Timer = (props) => {
	const [seconds, setSeconds] = useState(0);


	useEffect(() => {
		let interval = null;
		if (props.start) {
			interval = setInterval(() => {
				setSeconds((seconds) => seconds + 1);
			}, 1000);
		} else if (!props.start && seconds !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [props.start, seconds]);
    
    return (
        <div className="time">{seconds}</div>
    )
};

export default Timer;
