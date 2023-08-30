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
	const width = windowWidth > 640 ? 600 : 340;
	const height = windowWidth > 640 ? 180 : 150;
	
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
					"grid gap-y-1 gap-x-4 mb-14",
					"grid-cols-5",
					"max-w-[200px] max-h-[400px]"
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
