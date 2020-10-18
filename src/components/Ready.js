import React, {useState} from "react";

const Ready = (props) => {
	const [name, setName] = useState("");

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = () => {
		props.getName(name)
		props.getReady()
	};

	return (
		<form className="ready" onSubmit={handleSubmit}>
			<label>
				Name
				<input required onChange={(e) => handleChange(e)} />
			</label>
			<input type="submit" value="Are you ready?" />
		</form>
	);
};

export default Ready;