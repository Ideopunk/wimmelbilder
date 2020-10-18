import React from "react";
import ASH from "../assets/Ash_trans.png";
import CC from "../assets/Candy_Cane.png";
import SNAIL from "../assets/Waving_Snail.png";

const Character = () => {
	return (
		<div>
			<img className="character" src={ASH} alt="current character" />
			<img className="character" src={CC} alt="current character" />
			<img className="character" src={SNAIL} alt="current character" />
		</div>
	);
};

export default Character;
