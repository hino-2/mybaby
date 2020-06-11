import React from "react";
import BabyLI from "../BabyLI";
import uniqid from "uniqid";
import "./style.scss";

const BabiesList = ({ babies = [], selectedBabyId = null, isEditable = true, showAge = true }) => (
	<div className="babies">
		{babies
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((item) => (
				<BabyLI
					baby={item}
					isEditable={isEditable}
					showAge={showAge}
					selected={selectedBabyId === item.id ? true : false}
					key={uniqid()}
				/>
			))}
	</div>
);

export default BabiesList;
