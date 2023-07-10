import React from "react";
import { Card } from "components/ui";

const CardWithDialog = (props) => {
	const {
		title,
		itemCount,
	} = props;

	return (
		<div>
			<Card
				header={title}
				headerClass="flex items-center justify-center bg-[#FFBF29] rounded-t-lg"
				className="w-64 h-40 shadow-md shadow-blue-900/50 bg-[#DEE5FF] rounded-lg"
			>
				<div className="flex items-center justify-center">
					<h1>{itemCount}</h1>
				</div>
			</Card>
		</div>
	);
};

export default CardWithDialog;
