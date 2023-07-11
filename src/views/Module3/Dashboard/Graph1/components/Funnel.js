import React from "react";
import GraphIcon from "./GraphIcon";

function Funnel(props) {
	const {
		goalList
	} = props;
	return (
		<div className="flex flex-col gap-1 items-center">
			<div
				className="w-[300px] h-[100px] bg-gradient-to-r from-yellow-300 from-1% via-yellow-50 via-50% to-yellow-300 to-99% flex flex-row items-center justify-center rounded-md shadow-blue-900/50 shadow-md"
				style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)" }}>
				<div className="grid grid-cols-4 gap-4">
					{goalList && goalList.map(
						goal => (
							<GraphIcon item={goal} key={goal.id}/>
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default Funnel;
