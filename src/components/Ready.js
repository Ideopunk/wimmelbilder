import React, {useState} from "react";

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
		<form className="ready" onSubmit={(e) => handleSubmit(e)}>
			<label className="ready-label">
				Name
				<input type="text" required onChange={(e) => handleChange(e)} />
			</label>
			<input className="ready-submit" type="submit" value="Are you ready?" />
		</form>
	);
};

export default Ready;