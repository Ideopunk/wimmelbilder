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
	const [gameEnd, setGameEnd] = useState(false);
	const [find, setFind] = useState([false, false, false]);

	// once it's mounted, go snag the leaderboard.
	useEffect(() => {
		console.log("use effect: snag leaderboard");
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

	useEffect(() => {
		console.log("state update");
	});

	useEffect(() => {
		console.log("leaderboard changed");
	}, [leaderboard]);

	const getReady = (newName) => {
		console.log("get ready");
		setName(newName);
		setReady(true);
	};

	const successfulFind = (number) => {
		console.log("successfulfind");
		setFind(
			find.map((char, index) => {
				if (index === number) {
					char = true;
				}
				return char;
			})
		);
	};

	useEffect(() => {
		console.log("wincheck");
		if (!find.includes(false)) {
			console.log("u win!");
			setGameEnd(true);
		}
	}, [find]);

	const winner = (winnerID) => {
		console.log("u win!");
		setID(winnerID);
		setReady(false);
		setFind([false, false, false]);
		setGameEnd(false);
	};

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
							<Timer
								name={name}
								gameEnd={gameEnd}
								ready={ready}
								id={id}
								winner={winner}
							/>
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
