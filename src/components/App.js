import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import LoaderContainer from "./LoaderContainer";
import Leaderboard from "./Leaderboard";
import Character from "./Character";
import "../style/App.scss";
import Ready from "./Ready";
import { db } from "../config/fbConfig";
import Timer from "./Timer";
const AT = lazy(() => import("./AT"));

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
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					const { name, time } = doc.data();
					console.log(name, time);
					console.log(doc.id);
					const smush = { name: name, time: time, id: doc.id };
					tempLeaderboard.push(smush);
				});
				setLearderboard((oldLeaderboard) => tempLeaderboard);
			});
	}, []);

	useEffect(() => {
		console.log("rerender");
	});

	const getReady = (newName) => {
		console.log("get ready");
		setName(newName);
		setReady(true);
	};

	const updateTime = () => {
		console.log("update time");
		setSeconds((seconds) => seconds + 1);
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

	const dbAdd = useCallback(() => {
		return db.collection("leaderboard").add({ name: name, time: seconds });
	}, [name, seconds]);

	// when a level is completed, check to see if we're done.
	useEffect(() => {
		console.log("win check");

		if (!find.includes(false)) {
			console.log("u win!");
			setReady(false);
			setFind([false, false, false]);
			dbAdd();
		}
	}, [find, dbAdd]);

	return (
		<div className="App">
			<div className="main">
				{ready ? (
					<Suspense fallback={<LoaderContainer />}>
						<AT find={find} successfulFind={successfulFind} />
					</Suspense>
				) : (
					<Ready getReady={getReady} />
				)}
			</div>
			<div className="sidebar">
				<Character find={find} />
				{leaderboard ? (
					<div className="leaderboard">
						<h3>Leaderboard</h3>

						<Leaderboard entrants={leaderboard} />
						<Timer
							name={name}
							seconds={seconds}
							updateTime={updateTime}
							ready={ready}
						/>
					</div>
				) : (
					<LoaderContainer />
				)}
			</div>
			<div className="cred">
				<p>
					Headshots from{" "}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://adventuretime.fandom.com/wiki/Adventure_Time_with_Finn_and_Jake_Wiki"
					>
						adventuretime.fandom.com
					</a>
				</p>
				<p>
					Adventure Time Wimmelbilder from{" "}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.reddit.com/r/adventuretime/comments/bvr37b/the_land_of_ooo_adventure_time_by_tom_preston/"
					>
						Tom Preston
					</a>
				</p>
			</div>
		</div>
	);
};

export default App;
