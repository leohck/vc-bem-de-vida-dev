import React from "react";
import SkillList from "../Skill/SkillList";
import AchievementList from "../Achievement/AchievementList";


function SkillAndAchievement() {
	return (
		<div className="flex flex-col gap-4 justify-between">
			<div className="w-1/2">
				<SkillList />
			</div>
			<div className="w-1/2">
				<AchievementList />
			</div>
		</div>
	);
}

export default SkillAndAchievement;
