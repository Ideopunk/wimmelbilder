import React from "react";
import ASH from "../assets/Ash_Headshot.png";
import CC from "../assets/Candy_Cane_Headshot.png";
import SNAIL from "../assets/Waving_Snail.png";

const Character = (props) => {
      const {find} = props


	return (
		<div>
			<img className={`character ${find[0]? "found" : ""}`} src={ASH} alt="current character" />
			<img className={`character ${find[1]? "found" : ""}`} src={CC} alt="current character" />
			<img className={`character ${find[2]? "found" : ""}`} src={SNAIL} alt="current character" />
		</div>
	);
};

export default Character;
