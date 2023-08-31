import React from "react";
import useResponsive from "../../utils/hooks/useResponsive";

function LifeAspectIconMicro({life_aspect, icon}) {
	const { windowWidth } = useResponsive();
	const width = windowWidth > 640 ? 40 : 30;
	const height = windowWidth > 640 ? 40 : 30;
	const img_src_path = "/img/icons/";
	const img_src = img_src_path + life_aspect + "/" + icon + ".png";
	return (
		<img src={img_src} alt={life_aspect} width={width} height={height}/>
	);
}

export default LifeAspectIconMicro;
