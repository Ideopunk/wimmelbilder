import React, { lazy, Suspense, useEffect, useState } from "react";
import LoaderContainer from "./LoaderContainer";
import Leaderboard from "./Leaderboard";
import Character from "./Character";
import "../style/App.scss";
import Ready from "./Ready";
import { db } from "../config/fbConfig";
const Timer = lazy(() => import("./Timer"));
const AT = lazy(() => import("./AT"));

const App = () => {
	const [ready, setReady] = useState(false);
	const [find, setFind] = useState([false, false, false]);
	const [name, setName] = useState("");
	const [leaderboard, setLearderboard] = useState(null);

	// once it's mounted, go snag the leaderboard.
	useEffect(() => {
		console.log("use effect: snag leaderboard");
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

	const win = () => {
		console.log("u win!");
		setReady(false);
		setFind([false, false, false]);
	};

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
						<Suspense fallback={<LoaderContainer />}>
							<Timer
								name={name}
								find={find}
								ready={ready}
								win={win}
							/>
						</Suspense>
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
