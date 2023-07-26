import React from "react";
import { Card } from "../../../components/ui";
import { GrowShrinkTag } from "components/shared";


const BigNumberCard = (props) => {
	const {
		icon,
		value,
		label,
		tagValue,
		tagPrefix,
		tagSuffix,
		gray,
		reverse,
		showIcon,
		showPercentage = false,
		percentage = 0
	} = props;
	return (
		<Card className="max-w-[240px] max-h-[240px] shadow-md shadow-blue-900/50 bg-[#DEE5FF]">
			<div className="flex flex-col items-center justify-center gap-4">
				<div>{icon}</div>
				{showPercentage ? (
					<p className="font-black text-black text-xl md:text-3xl">{percentage}%</p>
				) : (
					<p className="font-black text-black text-xl md:text-3xl">{value}</p>
				)}
				<div>
					<p className="text-xs text-center md:text-base">{label}</p>
				</div>
				<div>
					<GrowShrinkTag
						value={tagValue}
						prefix={tagPrefix}
						suffix={tagSuffix}
						gray={gray}
						reverse={reverse}
						showIcon={showIcon}
					/>
				</div>
			</div>
		</Card>
	);
};

export default BigNumberCard;
