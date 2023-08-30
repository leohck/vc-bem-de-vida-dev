import React from "react";
import GraphIcon from "./GraphIcon";
import classNames from "classnames";

function Funnel(props) {
	const {
		goalList
	} = props;
	const img_src_path = "/img/module3/WishCloud/";
	const img_src = img_src_path + "seta.png";
	return (
		<div className="flex flex-col gap-1 items-center">
			<div className={classNames(
				     "h-[250px] w-[350px] md:w-[800px]",
				     "bg-contain bg-no-repeat bg-center",
				     "flex flex-row items-center justify-center"
			     )}
			     style={{
				     backgroundImage: `url(${img_src})`
			     }}
			>
				<div className="grid grid-cols-2 gap-x-1 gap-y-2 items-center justify-center max-w-[70px]">
					{goalList && goalList.map(
						goal => (
							<GraphIcon item={goal} key={goal.id} />
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default Funnel;
