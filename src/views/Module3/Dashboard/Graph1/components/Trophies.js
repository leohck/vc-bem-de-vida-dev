import React, { useEffect, useState } from "react";
import classNames from "classnames";
import GraphIcon from "./GraphIcon";
import useResponsive from "../../../../../utils/hooks/useResponsive";

function Trophies(props) {
	const {
		achievementList
	} = props;
	const img_src_path = "/img/module3/WishCloud/";
	const img_src = img_src_path + "prateleira.png";
	const { windowWidth } = useResponsive();
	const width = windowWidth > 640 ? 600 : 500;
	const height = windowWidth > 640 ? 300 : 300;
	
	return (
		<div className="flex flex-row justify-center items-center">
			<div id="trophies"
			     className={classNames(
				     `max-h-[200px] md:max-h-[300px] md:h-[${height}px] w-[${width}px]`,
				     "bg-contain bg-no-repeat bg-center",
				     "flex flex-row items-center justify-center"
			     )}
			     style={{
				     backgroundImage: `url(${img_src})`
			     }}
			>
				<div className={classNames(
					"grid md:gap-y-1 gap-x-1 md:gap-x-3",
					"grid-cols-6 md:grid-cols-10",
					"mb-10 md:mb-20 px-4",
					"max-w-[400px] md:max-w-[500px]"
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
