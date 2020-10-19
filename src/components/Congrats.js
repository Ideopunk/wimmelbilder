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
		db.collection("leaderboard")
			.orderBy("time")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc, index) => {
					if (doc.id === id) {
						setRank(index);
					}
				});
			});
	}, [id]);

	useEffect(() => {
		switch (rank % 10) {
			case "1":
				setSuffix("st");
				break;
			case "2":
				setSuffix("nd");
				break;
			case "3":
				setSuffix("rd");
				break;
			default:
				setSuffix("th");
		}
	}, [rank]);

	return (
		<div className="cover" onClick={handleClick}>
			<div className="congrats fade">
				<p>Congratulations!</p>
				{suffix?                 <p>
					{" "}
					You came in {rank + suffix} place!
				</p> : <LoaderContainer />}

			</div>
		</div>
	);
};

export default Congrats;
