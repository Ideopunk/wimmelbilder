import React, {useState} from "react";
import WIMMELBILDER from "../assets/adventuretime.png";

const AT = (props)  => {

    const handleClick = (e) => {
        console.log(e.target)
        // get coordinates
        // pass them to app to check against cloud function
    }

    return (
        <img className="image" src={WIMMELBILDER} alt="adventure time wimmelbilder" onClick={(e) => handleClick(e)}/>
    )
}

export default AT;