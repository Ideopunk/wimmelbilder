import React, {useState} from "react";
import Character from "./Character";

const Ready = (props) => {
	const [name, setName] = useState("");

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		props.getReady(name)
	};

	return (
		<form className="ready fade" onSubmit={(e) => handleSubmit(e)}>
			<label className="ready-label">
				Name
				<input type="text" maxLength={16} required onChange={(e) => handleChange(e)} />
			</label>
			<input className="ready-submit" type="submit" value="Are you ready?" />
			<h3>Find these characters!</h3>
			<Character find={["", "", "", ""]}/>
		</form>
	);
};

export default Ready;