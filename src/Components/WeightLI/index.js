import React, { useState } from "react";
import WeightDelete from "../WeightDelete";
import "./style.scss";

const WeightLI = ({ weight, isEditable = true, deleteweight }) => {
	const [date, setDate] = useState(new Date(weight.date).toLocaleDateString("en-CA") || "");
	const [value, setValue] = useState(weight.weight || "");

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	const handleValueChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className="weight-li">
			<div className="date">
				<input type="date" value={date} onChange={handleDateChange} />
			</div>
			<div className="weight">
				<input type="text" value={value} onChange={handleValueChange} />
			</div>
			<div className="normal">
				<font>&nbsp;</font>
			</div>
			{isEditable ? <WeightDelete weight={weight} deleteweight={deleteweight} /> : []}
		</div>
	);
};

export default WeightLI;
