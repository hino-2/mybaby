import React from "react";
import WeightLI from "../WeightLI";
import "./style.scss";

const WeightList = ({ weights = [], isEditable = true, deleteweight }) => (
	<div className="weights" key={weights.length}>
		{weights
			.sort((a, b) => new Date(a.date) - new Date(b.date))
			.map((item) => (
				<WeightLI weight={item} isEditable={isEditable} deleteweight={deleteweight} key={item.id} />
			))}
	</div>
);

export default WeightList;
