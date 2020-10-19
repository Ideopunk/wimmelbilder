import React, { useState, useEffect } from "react";
import { db } from "../config/fbConfig";

const Timer = (props) => {
	const [seconds, setSeconds] = useState(0);

	const { find, name, ready, id, winner } = props;
	// const win = props.win;

	useEffect(() => {
		console.log("timer use effect");
		console.log(ready);
		let interval = null;
		if (ready) {
			interval = setInterval(() => {
				setSeconds((s) => s + 1);
			}, 1000);
		} else if (!ready && id) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [ready, id]);

	useEffect(() => {
		console.log("wincheck");
		if (!find.includes(false)) {
			db.collection("leaderboard")
				.add({ name: name, time: seconds })
				.then((docRef) => winner(docRef.id));
		}
	}, [find, name, seconds, winner]);

	return (
		<ul className="entrant" key="new">
			<li className="player-name">{name}</li>
			<li>{seconds}</li>
		</ul>
	);
};

export default Timer;
