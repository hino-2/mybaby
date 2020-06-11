import React, { useState } from "react";
import WeigthDelete from "../WeigthDelete";
import "./style.scss";

const WeigthLI = ({ weigth, isEditable = true, deleteWeigth }) => {
	const [date, setDate] = useState(weigth.date || "");
	const [value, setValue] = useState(weigth.weigth || "");

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	const handleValueChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className="weigth-li">
			<div className="date">
				<input type="date" value={date} onChange={handleDateChange} />
			</div>
			<div className="weigth">
				<input type="text" value={value} onChange={handleValueChange} />
			</div>
			<div className="normal">
				<font>&nbsp;</font>
			</div>
			{isEditable ? <WeigthDelete weigth={weigth} deleteWeigth={deleteWeigth} /> : []}
		</div>
	);
};

export default WeigthLI;
