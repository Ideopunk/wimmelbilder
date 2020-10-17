import React from "react";
import WIMMELBILDER from "../assets/adventuretime.png";
import ASH from "../assets/Ash_trans.png";
import CC from "../assets/Candy_Cane.png";
import SNAIL from "../assets/Waving_Snail.png";

const Character = (props) => {
	let character = null;
	switch (props.level) {
		case 2:
            character = CC;
            break;
		case 3:
            character = SNAIL;
            break;
        default: 
            character = ASH;
	}

	return <img className="character" src={character} alt="current character" />;
};

export default Character;
