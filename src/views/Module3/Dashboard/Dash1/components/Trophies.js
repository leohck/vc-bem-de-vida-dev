import React from "react";
import classNames from "classnames";
import { getAchievementIconFromValue } from "../../../../auto-conhecimento/form.options";

function Trophies(props) {
	const {
		achievementList
	} = props;
	const img_src_path = "/img/module3/";
	const img_src = img_src_path + "prateleira.png";
	return (
		<div className="flex flex-row justify-center items-center">
			<div
				className={classNames(
					"h-[100px] w-[100px]",
					"bg-contain bg-no-repeat bg-center",
					"flex flex-row items-center justify-center"
				)}
				style={{
					backgroundImage: `url(${img_src_path + "trofeu.png"})`
				}}
			>
			
			</div>
			<div id="trophies"
			     className={classNames(
				     "h-[150px] w-[400px]",
				     "bg-contain bg-no-repeat bg-center",
				     "flex flex-row items-center justify-center"
			     )}
			     style={{
				     backgroundImage: `url(${img_src})`
			     }}
			>
				<div className="grid grid-cols-4 gap-4">
					{achievementList && achievementList.map(
						achievement => (
							<span key={achievement.id}>
								{getAchievementIconFromValue(achievement.icon)}
							</span>
						)
					)}
				</div>
			</div>
			<div className={classNames(
				"h-[100px] w-[100px]",
				"bg-contain bg-no-repeat bg-center",
				"flex flex-row items-center justify-center"
			)}
			     style={{
				     backgroundImage: `url(${img_src_path + "trofeu-estrela.png"})`
			     }}>
				
			</div>
		</div>
	)
}

export default Trophies;
