import React, { useState, useEffect } from "react";
import { db } from "../config/fbConfig";

const Timer = (props) => {
	const [seconds, setSeconds] = useState(0);

	const { find, name, ready, id, winner } = props;

	useEffect(() => {
		let interval = null;
		if (ready && find.includes(false)) {
			interval = setInterval(() => {
				setSeconds((s) => s + 1);
			}, 1000);
		} else if (!find.includes(false)) {
			clearInterval(interval);
			db.collection("leaderboard")
				.add({ name: name, time: seconds })
				.then((docRef) => winner(docRef.id));
		}
		return () => clearInterval(interval);
	}, [ready, find, name, seconds, id, winner]);

	return (
		<ul className="entrant" key="new">
			<li className="player-name">{name}</li>
			<li>{seconds}</li>
		</ul>
	);
};

export default Timer;
