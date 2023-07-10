import React from "react";
import classNames from "classnames";
import { getAchievementIconFromValue } from "../../../../auto-conhecimento/form.options";

const WishCloud = (props) => {
	const {
		wishList
	} = props;
	const img_src_path = "/img/module3/";
	const img_src = img_src_path + "wishcloud2.png";
	return (
		<div id="wishcloud"
		     className={classNames(
			     "h-[300px] w-[1000px]",
			     "bg-auto bg-no-repeat bg-center",
			     "flex flex-row items-center justify-center"
		     )}
		     style={{
			     backgroundImage: `url(${img_src})`
		     }}
		>
			<div className="grid grid-cols-4 gap-4">
				{wishList && wishList.map(
					wish => (
						<span key={wish.id}>
							{getAchievementIconFromValue(wish.icon)}
						</span>
					)
				)}
			</div>
		</div>
	);
};

export default WishCloud;
