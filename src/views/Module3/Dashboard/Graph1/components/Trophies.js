import React, { useEffect } from "react";
import classNames from "classnames";
import GraphIcon from "./GraphIcon";

function Trophies(props) {
	const {
		achievementList
	} = props;
	const img_src_path = "/img/module3/";
	const img_src = img_src_path + "prateleira.jpeg";
	const width = 400;
	const height = 180;
	let mb = 28;
	let gridCols = 5;
	let gap = 2;

	return (
		<div className="flex flex-row justify-center items-center">
			<div id="trophies"
			     className={classNames(
				     `h-[${height}px] w-[${width}px]`,
				     "bg-contain bg-no-repeat bg-center",
				     "flex flex-row items-center justify-center"
			     )}
			     style={{
				     backgroundImage: `url(${img_src})`
			     }}
			>
				<div className={classNames(
					"grid flex-col",
					`gap-${achievementList.length < 10 ? gap : 1}`,
					`grid-cols-${achievementList.length < 10 ? gridCols : 10}`,
					`mb-${achievementList.length < 10 ? mb : 20}`,
					`h-[${height/2}px] w-[${width}px] p-5`
				)}
				>
					{achievementList && achievementList.map(
						achievement => (
							<GraphIcon item={achievement} key={achievement.id} />
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default Trophies;
