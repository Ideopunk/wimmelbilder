import React, { useState } from "react";
import WIMMELBILDER from "../assets/adventuretime.png";
import {checkChar} from "../config/fbConfig";

const AT = (props) => {
	const handleClick = (e) => {
		// get coordinates
		const realX = e.clientX - e.target.getBoundingClientRect().x;
		const realY = e.clientY - e.target.getBoundingClientRect().y;
		const percentX = Math.round((realX / e.target.getBoundingClientRect().width) * 100);
		const percentY = Math.round((realY / e.target.getBoundingClientRect().height) * 100);
		console.log(percentX, percentY);

		// pass them to cloud function to check
		checkChar({x: percentX, y: percentY}).then(result => {
			console.log(result.data)
		})
	};

	return (
		<div className="image-container">
			<img
				className="image"
				src={WIMMELBILDER}
				alt="adventure time wimmelbilder"
				onClick={(e) => handleClick(e)}
			/>
		</div>
	);
};

export default AT;
