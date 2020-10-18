import React from "react";

const Leaderboard = (props) => {
	// get stuff from firestore
	const entrants = props.entrants.map((entrant) => {
		return (
			<ul>
				<li>{entrant.name}</li>
				<li>{entrant.time}</li>
			</ul>
		);
	});

	return <div>{entrants}</div>;
};

export default Leaderboard;
