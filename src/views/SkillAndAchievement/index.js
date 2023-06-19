import React from "react";
import SkillList from "../Skill/SkillList";
import AchievementList from "../Achievement/AchievementList";


function SkillAndAchievement() {
	return (
		<div className="flex flex-row gap-4 justify-evenly">
			<div className="flex flex-col gap-4">
				<h1>Habilidades Form</h1>
				<SkillList />
			</div>
			<div className="flex flex-col gap-4">
				<h1>Conquistas Form</h1>
				<AchievementList />
			</div>
		</div>
	);
}

export default SkillAndAchievement;
