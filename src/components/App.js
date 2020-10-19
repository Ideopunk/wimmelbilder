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
	const [find, setFind] = useState([false, false, false]);
	const [name, setName] = useState("");
	const [leaderboard, setLearderboard] = useState(null);
	const [win, setWin] = useState(false);
	const [id, setID] = useState("");

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
					console.log(name, time);
					console.log(doc.id);
					const smush = { name: name, time: time, id: doc.id };
					tempLeaderboard.push(smush);
				});
				setLearderboard(tempLeaderboard);
			});
	}, []);

	useEffect(() => {
		console.log("rerender App");
	});

	useEffect(() => {
		console.log('leaderboard changed')
	}, [leaderboard])

	const getReady = (newName) => {
		console.log("get ready");
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

	const winner = (winnerID) => {
		console.log("u win!");
		setReady(false);
		setFind([false, false, false]);
		setID(winnerID);
	};

	// wait until id is set to trigger winner id.
	useEffect(() => {
		if (id) {
			setWin(true);
		}
	}, [id]);

	const newGame = () => {
		setWin(false);
		setID(false);
	};

	return (
		<div className="App">
			{win ? (
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
				{leaderboard ? (
					<div className="leaderboard">
						<h3>Leaderboard</h3>

						<Suspense fallback={<LoaderContainer />}>
							<Timer
								name={name}
								find={find}
								ready={ready}
								win={win}
								winner={winner}
							/>
						</Suspense>
						<Leaderboard entrants={leaderboard} />

					</div>
				) : (
					<LoaderContainer />
				)}
			</div>
			<Cred />
		</div>
	);
};

export default App;
