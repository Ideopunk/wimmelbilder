import React from "react";
import Timer from "./Timer";

const Leaderboard = (props) => {
	// get stuff from firestore
	const entrants = props.entrants.map((entrant) => {
		console.log(entrant)
		return (
			<ul className="entrant" key={entrant.id}>
				<li>{entrant.name}</li>
				<li>{entrant.time}</li>
			</ul>
		);
	});

	return (
		<div className="leaderboard">
			<h3>Leaderboard</h3>
			{entrants}
			<Timer name={props.name} seconds={props.seconds} updateTime={props.updateTime} start={props.ready} />

		</div>
	);
};

export default Leaderboard;
