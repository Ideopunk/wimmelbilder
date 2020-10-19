import React, { lazy, Suspense, useEffect, useState } from "react";
import LoaderContainer from "./LoaderContainer";
import Leaderboard from "./Leaderboard";
import Character from "./Character";
import "../style/App.scss";
import Ready from "./Ready";
import { db } from "../config/fbConfig";
import Cred from "./Cred";
import AT from "./AT";
const Timer = lazy(() => import("./Timer"));
const Congrats = lazy(() => import("./Congrats"));

const App = () => {
	const [ready, setReady] = useState(false);
	const [name, setName] = useState("");
	const [leaderboard, setLearderboard] = useState(null);
	const [id, setID] = useState("");
	const [find, setFind] = useState([false, false, false]);

	// once it's mounted, go snag the leaderboard.
	useEffect(() => {
		let tempLeaderboard = [];
		db.collection("leaderboard")
			.orderBy("time")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					const { name, time } = doc.data();
					const smush = { name: name, time: time, id: doc.id };
					tempLeaderboard.push(smush);
				});
				setLearderboard(tempLeaderboard);
			});
	}, []);

	const getReady = (newName) => {
		setName(newName);
		setReady(true);
	};

	const successfulFind = (number) => {
		setFind(
			find.map((char, index) => {
				if (index === number) {
					char = true;
				}
				return char;
			})
		);
	};

	// score has been added to leaderboard, now end game
	const winner = (winnerID) => {
		setReady(false);
		setID(winnerID);
		setFind([false, false, false]);
		setLearderboard("");
		let tempLeaderboard = [];

		// display the updated leaderboard.
		db.collection("leaderboard")
			.orderBy("time")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					const { name, time } = doc.data();
					const smush = { name: name, time: time, id: doc.id };
					tempLeaderboard.push(smush);
				});
				setLearderboard(tempLeaderboard);
			});
	};

	// click outside victory screen, start a new game. 
	const newGame = () => {
		setID("");
	};

	return (
		<div className="App">
			{id ? (
				<Suspense fallback={<LoaderContainer />}>
					<Congrats id={id} newGame={newGame} />
				</Suspense>
			) : (
				""
			)}
			<div className="main">
				{ready ? (
					<AT find={find} successfulFind={successfulFind} />
				) : (
					<Ready getReady={getReady} />
				)}
			</div>
			<div className="sidebar fade">
				<Character find={find} />
				<div className="leaderboard">
					<h3>Leaderboard</h3>

					{ready && (
						<Suspense fallback={<LoaderContainer />}>
							<Timer name={name} ready={ready} id={id} find={find} winner={winner} />
						</Suspense>
					)}

					{leaderboard ? <Leaderboard entrants={leaderboard} /> : <LoaderContainer />}
				</div>
			</div>
			<Cred />
		</div>
	);
};

export default App;
