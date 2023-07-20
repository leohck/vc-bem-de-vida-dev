import React from "react";
import SkillList from "../Skill/SkillList";
import AchievementList from "../Achievement/AchievementList";
import useResponsive from "../../utils/hooks/useResponsive";


function SkillAndAchievement() {
	const { smaller, larger } = useResponsive();
	return (
		<>
			{smaller.md && (
				<div className="flex flex-col gap-4 justify-between">
					<div className="w-1/2">
						<SkillList />
					</div>
					<div className="w-1/2">
						<AchievementList />
					</div>
				</div>
			)}
			{larger.md && (
				<div className="flex flex-row gap-4 justify-between">
					<div className="w-1/2">
						<SkillList />
					</div>
					<div className="w-1/2">
						<AchievementList />
					</div>
				</div>
			)}
		</>
	);
}

export default SkillAndAchievement;
