import React, { useEffect, useState } from "react";
import AT from "./AT";
import Timer from "./Timer";
import Leaderboard from "./Leaderboard";
import Character from "./Character";
import "../style/App.scss";
import Ready from "./Ready";
import {db} from "../config/fbConfig";


const App = () => {
	const [ready, setReady] = useState(false);
	const [level, setLevel] = useState(0);
	const [name, setName] = useState("");
	const [leaderboard, setLearderboard] = useState(null);
	const [seconds, setSeconds] = useState(0);

	// once it's mounted, go snag the leaderboard.
	useEffect(() => {
		console.log("use effect");
		let tempLeaderboard = [];
		db.collection("leaderboard")
			.get()
			.then((snapshot) =>
				snapshot.docs.forEach((doc) => {
					console.log(doc.data());
					tempLeaderboard.push(doc.data());
				})
			)
			.then(setLearderboard(tempLeaderboard))
			.then(console.log(leaderboard));
	}, []);

	const getReady = (newName) => {
		console.log("get ready");
		setName(newName);
		setReady(true);
	};

	const updateTime = (newTime) => {
		setSeconds((seconds) => newTime);
	};

	const successfulFind = () => {
		setLevel((level) => level + 1);
	};

	// when a level is completed, check to see if we're done.
	useEffect(() => {
		console.log("use effect");

		if (level > 3) {
			setReady(false);
			setLevel(0);
			win();
		}
	}, [level]);

	// yay, we're done, add to  leaderboarded
	const win = () => {
		db.collection("leaderboard").add({ name: name, time: seconds });
	};

	return (
		<div className="App">
			{ready ? <AT level={level} /> : <Ready getReady={getReady} />}
			<div className="sideboard">
				<Character level={level} />
				<Timer seconds={seconds} updateTime={updateTime} start={ready} />
				{leaderboard? <Leaderboard entrants={leaderboard} /> : ""}
			</div>
		</div>
	);
};

export default App;
