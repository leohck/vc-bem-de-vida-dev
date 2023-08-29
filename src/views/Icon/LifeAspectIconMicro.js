import React from "react";

function LifeAspectIconMicro({life_aspect, icon}) {
	const img_src_path = "/img/icons/";
	const img_src = img_src_path + life_aspect + "/" + icon + ".png";
	return (
		<img src={img_src} alt={life_aspect} width={40} height={40}/>
	);
}

export default LifeAspectIconMicro;
