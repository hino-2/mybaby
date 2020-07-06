import React from "react";
import { Image, Transformation } from "cloudinary-react";
import "./style.scss";

const WeightDelete = ({ weight = {}, deleteweight }) => (
	<div className="weight-delete">
		<Image cloudName="hino-2" publicId="v1/mybaby/close.png" id={weight.id} onClick={deleteweight} title="Удалить">
			<Transformation height="20" width="20" quality="auto:good" crop="fit" />
		</Image>
	</div>
);

export default WeightDelete;
