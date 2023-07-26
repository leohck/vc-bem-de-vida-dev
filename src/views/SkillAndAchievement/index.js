import React from "react";
import SkillList from "../Skill/SkillList";
import AchievementList from "../Achievement/AchievementList";


function SkillAndAchievement() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			<SkillList />
			<AchievementList />
		</div>
	);
}

export default SkillAndAchievement;
