import React, { useState } from "react";
import AT from "./AT";
import Timer from "./Timer";
import Leaderboard from "./Leaderboard";
import Character from "./Character";
import "../style/App.scss";
import Ready from "./Ready";


const App = () => {
	const [ready, setReady] = useState(false);
	const [level, setLevel] = useState(0)

	const getReady = () => {
		setReady(true);
	};

	const successfulFind = () => {
		setLevel(level => level + 1)
	}

	if (ready) {
		return (
			<div className="App">
				<AT level={level} />
				<div className="sideboard">
					<Character level={level}/>
					<Timer start={ready}/>
					<Leaderboard />
				</div>
			</div>
		);
	} else {
		return <div className="App">{<Ready getReady={getReady} />}</div>;
	}
};

export default App;
