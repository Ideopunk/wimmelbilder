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
	const [find, setFind] = useState([false, false, false]);
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

	const successfulFind = (number) => {
		setFind(find.map((char, index) => {
			if (index === number) {
				char = true
			}; 
			return char;
	}))};

	// when a level is completed, check to see if we're done.
	useEffect(() => {
		console.log("win check");

		if (!find.includes(false)) {
			console.log("u win!")
			setReady(false);
			setFind([false, false, false]);
			win();
		}
	}, [find]);

	// yay, we're done, add to  leaderboarded
	const win = () => {
		db.collection("leaderboard").add({ name: name, time: seconds });
	};

	return (
		<div className="App">
			{ready ? <AT find={find} successfulFind={successfulFind}/> : <Ready getReady={getReady} />}
			<div className="sidebar">
				<Character find={find} />
				<Timer seconds={seconds} updateTime={updateTime} start={ready} />
				{leaderboard? <Leaderboard entrants={leaderboard} /> : ""}
			</div>
		</div>
	);
};

export default App;
