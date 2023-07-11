import React from "react";
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
					"grid grid-cols-10 gap-4 mb-32",
					`h-[${height/2}px] w-[${width}px] px-5`
				)}
				>
					{achievementList && achievementList.map(
						achievement => (
							<GraphIcon item={achievement} />
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default Trophies;
