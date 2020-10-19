import React, { useState, useEffect } from "react";
import { db } from "../config/fbConfig";

const Timer = (props) => {
	const [seconds, setSeconds] = useState(0);

	const {find, name, ready, updateTime, win} = props
	// const win = props.win;

	useEffect(() => {
		console.log('timer use effect')
		console.log(ready)
		let interval = null;
		if (ready) {
			interval = setInterval(() => {
				setSeconds(s => s + 1);
			}, 1000);
		} else if (!ready && seconds !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [ready, seconds, updateTime]);
	
	useEffect(() => {
		console.log('wincheck')
		if (!find.includes(false)) {
			console.log("u win!");
			db.collection("leaderboard").add({ name: name, time: seconds })
			win()
		}
	}, [find, name, seconds, win]);

    return (
		<ul className="entrant" key="new">
			<li className="player-name">{props.name}</li>
			<li>{props.seconds}</li>
		</ul>
    )
};

export default Timer;
