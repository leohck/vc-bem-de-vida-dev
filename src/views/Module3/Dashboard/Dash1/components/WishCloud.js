import React from "react";
import classNames from "classnames";
import { getAchievementIconFromValue } from "../../../../auto-conhecimento/form.options";

const WishCloud = (props) => {
	const {
		wishList
	} = props;
	const img_src_path = "/img/module3/";
	const img_src = img_src_path + "wishcloud.png";
	return (
		<div className={classNames(
			"box-content h-[200px] w-[1200px]",
			"bg-contain bg-blue-200",
		)}
		     style={{
			     backgroundImage: `url(${img_src})`,
			     backgroundPosition: 'center',
		     }}
		>
			<div className="grid grid-cols-4 gap-4 items-center justify-self-center">
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
}

export default WishCloud;
