import React from "react";
import WeigthLI from "../WeigthLI";
import "./style.scss";

const WeigthList = ({ weigths = [], isEditable = true, deleteWeigth }) => {
	console.log(weigths);
	return (
		<div className="weigths">
			{weigths
				.sort((a, b) => !a.date.localeCompare(b.date))
				.map((item) => (
					<WeigthLI weigth={item} isEditable={isEditable} deleteWeigth={deleteWeigth} key={item.id} />
				))}
		</div>
	);
};

export default WeigthList;
