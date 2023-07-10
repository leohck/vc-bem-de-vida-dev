import React from "react";
import { getAchievementIconFromValue } from "../../../../auto-conhecimento/form.options";
import classNames from "classnames";

function Funnel(props) {
	const {
		goalList
	} = props;
	return (
		<div className="flex flex-col gap-1 items-center">
			<div
				className="w-[300px] h-[100px] bg-gray-100 flex flex-row items-center justify-center rounded-md shadow-blue-900/50 shadow-md"
				style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)" }}>
				<div className="grid grid-cols-4 gap-4">
					{goalList && goalList.map(
						goal => (
							<span key={goal.id}>
							{getAchievementIconFromValue(goal.icon)}
						</span>
						)
					)}
				</div>
			</div>
			<div
				className="w-[180px] h-[70px] bg-gray-100 flex flex-row items-center justify-center rounded-md shadow-blue-900/50 shadow-md"
				style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)" }}>
				<div className="grid grid-cols-2 gap-2">
					{goalList && goalList.map(
						goal => (
							<span key={goal.id}>
							{getAchievementIconFromValue(goal.icon)}
						</span>
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default Funnel;
