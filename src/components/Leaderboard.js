import React from "react";

const Leaderboard = (props) => {
	// get stuff from firestore
	console.log("leaderboard rerender");
	const entrants = props.entrants.map((entrant) => {
		return (
			<ul className="entrant" key={entrant.id}>
				<li>{entrant.name}</li>
				<li>{entrant.time}</li>
			</ul>
		);
	});

	return <>{entrants}</>;
};

export default Leaderboard;
