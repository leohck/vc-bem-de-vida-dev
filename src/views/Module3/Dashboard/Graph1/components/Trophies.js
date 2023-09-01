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
	return (
		<div className="flex flex-row justify-center items-center">
			<div id="trophies"
			     className={classNames(
				     `md:w-[500px] md:h-[300px]`,
				     "w-[300px] h-[200px]",
				     "bg-center bg-contain bg-no-repeat",
				     "flex items-center justify-start"
			     )}
			     style={{
				     backgroundImage: `url(${img_src})`
			     }}
			>
				<div className={classNames(
					"w-5/6",
					"grid grid-cols-10",
					"md:ml-11 md:mb-16",
					"ml-6 mb-10"
				)}
				>
					{achievementList && achievementList.slice(0, 20).map(
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
