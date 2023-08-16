import React, { useEffect, useState } from "react";
import {
	getAchievements,
	getSkills
} from "../../../services/PersonalService";
import { CardWithDialog } from "../../../components/new";
import store from "../../../store";
import { getInProgressRoutineActionList } from "../../../services/RoutineActionService";
import { useGoalList } from "../../../hooks/module3/useGoalList";
import PolarGraph from "./components/PolarGraph";
import { useUserID } from "../../../hooks/useUserID";


const Index = () => {
	const { userID } = useUserID();
	const [actionsCount, setActionsCount] = useState(0);
	const [skillsCount, setSkillsCount] = useState(0);
	const [achievementsCount, setAchievementsCount] = useState(0);
	
	const { goals, refreshGoalList } = useGoalList();
	
	useEffect(() => {
		const fetchSkillsData = async () => {
			try {
				const resp = await getSkills(userID);
				if (resp.data) {
					const skills = resp.data;
					setSkillsCount(skills.length);
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		const fetchAchievementsData = async () => {
			try {
				const resp = await getAchievements(userID);
				if (resp.data) {
					const achievements = resp.data;
					setAchievementsCount(achievements.length);
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		const fetchRoutineActionsData = async () => {
			try {
				const resp = await getInProgressRoutineActionList(userID);
				if (resp.data) {
					const actions = resp.data;
					setActionsCount(actions.length);
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		if (userID) {
			fetchSkillsData();
			fetchAchievementsData();
			fetchRoutineActionsData();
			refreshGoalList();
		}
	}, [userID]);
	
	return (
		<div>
			<div className="mb-8 grid justify-items-center">
				<h3>Resumo de suas Atividades</h3>
			</div>
			<div className="grid grid-cols-1 justify-items-center gap-2 md:grid-cols-4 ">
				<div>
					<CardWithDialog
						title={"Ações em Andamento"}
						itemCount={actionsCount}
					/>
				</div>
				<div>
					<CardWithDialog
						title={"Metas"}
						itemCount={goals.length}
					/>
				</div>
				<div>
					<CardWithDialog
						title={"Conquistas"}
						itemCount={achievementsCount}
					/>
				</div>
				<div>
					<CardWithDialog
						title={"Habilidades"}
						itemCount={skillsCount}
					/>
				</div>
			</div>
			
			<div className="grid grid-cols-1 gap-4 mt-24 md:grid-cols-2">
				<PolarGraph />
				<div></div>
			</div>
		</div>
	);
};

export default Index;
