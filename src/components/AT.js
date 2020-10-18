import React, { useState } from "react";
import WIMMELBILDER from "../assets/adventuretime.png";

const AT = (props) => {
	const handleClick = (e) => {
		// get coordinates
		const realX = e.clientX - e.target.getBoundingClientRect().x;
		const realY = e.clientY - e.target.getBoundingClientRect().y;
		const percentX = realX / e.target.getBoundingClientRect().width;
		const percentY = realY / e.target.getBoundingClientRect().height;
		console.log(percentX, percentY);
		// pass them to app to check against cloud function
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
