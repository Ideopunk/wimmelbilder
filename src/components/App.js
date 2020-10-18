import React, { useEffect, useState } from "react";
import AT from "./AT";
import Timer from "./Timer";
import Leaderboard from "./Leaderboard";
import Character from "./Character";
import "../style/App.scss";
import Ready from "./Ready";
import db from "../config/fbConfig";

const App = () => {
	const [ready, setReady] = useState(false);
	const [level, setLevel] = useState(0);
	const [name, setName] = useState("");
	const [leaderboard, setLearderboard] = useState(null);
	const [seconds, setSeconds] = useState(0);

	// once it's mounted, go snag the leaderboard.
	useEffect(() => {
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

	const getReady = () => {
		setReady(true);
	};

	const getName = (newName) => {
		setName(newName);
	};

	const updateTime = (newTime) => {
		setSeconds((seconds) => newTime);
	};

	const successfulFind = () => {
		setLevel((level) => level + 1);
	};

	// when a level is completed, check to see if we're done.
	useEffect(() => {
		if (level > 3) {
			setReady(false);
			setLevel(0);
			win();
		}
	}, [level]);

	// yay, we're done, get leaderboarded
	const win = () => {
		db.collection("leaderboard").add({ name: name, time: seconds });
	};

	if (ready) {
		console.log(leaderboard);
		return (
			<div className="App">
				<AT level={level} />
				<div className="sideboard">
					<Character level={level} />
					<Timer seconds={seconds} updateTime={updateTime} start={ready} />
					<Leaderboard entrants={leaderboard} />
				</div>
			</div>
		);
	} else {
		return <div className="App">{<Ready getName={getName} getReady={getReady} />}</div>;
	}
};

export default App;
