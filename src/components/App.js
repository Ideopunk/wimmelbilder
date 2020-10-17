import React, { useState } from "react";
import AT from "./AT";
import Timer from "./Timer";
import Leaderboard from "./Leaderboard";
import "../style/App.scss";

const Ready = (props) => {
	const [name, setName] = useState("");

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = () => {
		console.log(name);
		// cloud firestore
	};

	return (
		<form className="ready" onSubmit={props.getReady}>
			<label>
				Name
				<input required onChange={(e) => handleChange(e)} />
			</label>
			<input type="submit" value="Are you ready?" />
		</form>
	);
};

const App = () => {
	const [ready, setReady] = useState(false);

	const getReady = () => {
		setReady(true);
	};

	if (ready) {
		return (
			<div className="App">
				<AT />
				<Timer start={ready}/>
			</div>
		);
	} else {
		return <div className="App">{<Ready getReady={getReady} />}</div>;
	}
};

export default App;
