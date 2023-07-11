import React from "react";
import { getAchievementIconFromValue } from "../../../../auto-conhecimento/form.options";
import { Tooltip } from "../../../../../components/ui";

function GraphIcon({item}) {
	return (
		<Tooltip title={item.value} key={item.id}>
			{getAchievementIconFromValue(item.icon)}
		</Tooltip>
	);
}

export default GraphIcon;
