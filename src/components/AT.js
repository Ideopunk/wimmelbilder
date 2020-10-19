import React, { useState } from "react";
import WIMMELBILDER from "../assets/adventuretime.png";
import { checkChar } from "../config/fbConfig";

const AT = (props) => {
	const { find, successfulFind } = props;
	const [hide, setHide] = useState(true);

	const handleClick = (e) => {
		console.log("clicked, now waiting");
		// get coordinates
		const realX = e.clientX - e.target.getBoundingClientRect().x;
		const realY = e.clientY - e.target.getBoundingClientRect().y;
		const percentX = Math.round((realX / e.target.getBoundingClientRect().width) * 100);
		const percentY = Math.round((realY / e.target.getBoundingClientRect().height) * 100);
		console.log(percentX, percentY);

		// pass them to cloud function to check
		checkChar({ x: percentX, y: percentY }).then((result) => {
			console.log(result.data);
			if (result.data.name === "Ash" && find[0] === false) {
				successfulFind(0);
			} else if (result.data.name === "Candy" && find[1] === false) {
				successfulFind(1);
			} else if (result.data.name === "Snail" && find[2] === false) {
				successfulFind(2);
			}
		});
	};

	const loadComplete = () => {
		setHide(false);
	};

	return (
		<div className="image-container">
			<img
				className={`image ${hide ? "hide" : ""}`}
				src={WIMMELBILDER}
				alt="adventure time wimmelbilder"
				onClick={(e) => handleClick(e)}
				onLoad={loadComplete}
			/>
		</div>
	);
};

export default AT;
