import React  from "react";
import { getLifeAspectIconFromValue, getLifeAspectRatingBgColor } from "../constants/constants";
import {
	getLifeAspectRatingColor
} from "../constants/constants";
import { Card } from "../../../../../components/ui";
import classNames from "classnames";
import { getAchievementIconFromValue } from "../../../../auto-conhecimento/form.options";

const LifeAspectColumn = (props) => {
	const {
		lifeAspect,
		aspectRating,
		cardsData
	} = props;
	
	const aspectRatingColor = getLifeAspectRatingColor(aspectRating);
	const aspectRatingBgColor = getLifeAspectRatingBgColor(aspectRating);
	
	const LifeAspectCard = ({data}) => {
		return (
			<div className={classNames(
				'box-content h-48 w-48',
				'rounded-md',
				'shadow-md',
				// `ring-2 ring-${aspectRatingColor}`,
				`ring-1 ring-gray-300`,
			)}>
				<div className="grid grid-cols-4 gap-4">
					{data && data.map(
						icon => (
							<span>
								{getAchievementIconFromValue(icon)}
							</span>
						)
					)}
				</div>
			</div>
		);
	};
	
	return (
		<Card
			className={classNames(
				'shadow-md',
				`ring-2 ring-${aspectRatingColor}`,
			)}
			bodyClass="flex flex-col gap-4 items-center">
			{getLifeAspectIconFromValue(lifeAspect)}
			<LifeAspectCard data={cardsData['goals']}/>
			<LifeAspectCard data={cardsData['achievements']}/>
		</Card>
	);
};

export default LifeAspectColumn;
