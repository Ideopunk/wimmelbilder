import React, { useState, useEffect } from "react";
import { db } from "../config/fbConfig";
import LoaderContainer from "./LoaderContainer";

const Congrats = (props) => {
	const { id, newGame } = props;
	const [rank, setRank] = useState(null);
	const [suffix, setSuffix] = useState("");

	const handleClick = () => {
		newGame();
	};

	useEffect(() => {
		console.log("use effect: snag leaderboard");
		console.log(id);
		db.collection("leaderboard")
			.orderBy("time")
			.get()
			.then((snapshot) => {
				let switchRank = null;

				snapshot.docs.forEach((doc, index) => {
					console.log(doc.data())
					if (doc.id === id) {
						console.log(index);
						switchRank = index + 1;
						setRank(index + 1);
					}
				});
				return switchRank;
			})
			.then((switchRank) => {
				console.log("switch use effect", switchRank);
				switch (switchRank % 10) {
					case 1:
						setSuffix("st");
						break;
					case 2:
						setSuffix("nd");
						break;
					case 3:
						setSuffix("rd");
						break;
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
					case 10:
					default:
						setSuffix("th");
						break;
				}
			});
	}, [id]);

	return (
		<div className="cover" onClick={handleClick}>
			<div className="congrats">
				<p>Congratulations!</p>
				{rank && suffix ? <p>You came in {rank + suffix} place!</p> : <LoaderContainer />}
			</div>
		</div>
	);
};

export default Congrats;
