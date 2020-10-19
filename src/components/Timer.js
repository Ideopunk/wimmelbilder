import React, { useEffect } from "react";

const Timer = (props) => {
	const {ready, seconds, updateTime} = props

	useEffect(() => {
		console.log('timer use effect')
		console.log(ready)
		let interval = null;
		if (ready) {
			interval = setInterval(() => {
				updateTime();
			}, 1000);
		} else if (!ready && seconds !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [ready, seconds, updateTime]);
    
    return (
		<ul className="entrant" key="new">
			<li className="player-name">{props.name}</li>
			<li>{props.seconds}</li>
		</ul>
    )
};

export default Timer;
