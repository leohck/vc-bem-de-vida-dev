import React from "react";

function LifeAspectIcon({life_aspect}) {
	const img_src_path = "/img/life_aspects/";
	const img_src = img_src_path + life_aspect + ".png";
	return (
		<img src={img_src} alt={life_aspect} width={70} height={70}/>
	);
}

export default LifeAspectIcon;
