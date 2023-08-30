import React from "react";
import classNames from "classnames";
import GraphIcon from "./GraphIcon";

const WishCloud = (props) => {
	const {
		wishList
	} = props;
	const img_src_path = "/img/module3/WishCloud/";
	const img_src_fundo = img_src_path + "nuvens_fundo.png";
	const img_src = img_src_path + "nuvem.png";
	return (
		<div className={classNames(
			"h-[180px] md:h-[250px] w-[350px] md:w-[1000px]",
			"bg-contain bg-center",
			"flex flex-row justify-center"
		)}
		     style={{
			     backgroundImage: `url(${img_src_fundo})`
		     }}>
			<div className={classNames(
				     "h-[180px] md:h-[250px] w-[350px] md:w-[800px]",
				     "bg-contain bg-no-repeat bg-center",
				     "flex flex-row items-center justify-center"
			     )}
			     style={{
				     backgroundImage: `url(${img_src})`
			     }}
			>
				<div className="grid grid-cols-4 gap-2 mt-6">
					{wishList && wishList.map(
						wish => (
							<GraphIcon item={wish} key={wish.id} />
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default WishCloud;
