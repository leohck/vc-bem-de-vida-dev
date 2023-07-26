import React, { useEffect, useRef, useState } from "react";
import { Chart } from "../../components/shared";
import {
	HEX_COLOR_NOT_RATED,
	HEX_COLOR_VERY_LOW,
	HEX_COLOR_LOW,
	HEX_COLOR_REGULAR,
	HEX_COLOR_HIGH,
	HEX_COLOR_VERY_HIGH,
	ASPECTS_TYPES,
	ASPECTS_QUESTIONS_SHORT, ASPECTS_TYPES_SHORT
} from "constants/aspects.constant";
import {
	getAchievements,
	getDashboardData,
	getSkills
} from "../../services/PersonalService";
import { CardWithDialog } from "../../components/new";
import store from "../../store";
import { getInProgressRoutineActionList, getRoutineActionList } from "../../services/RoutineActionService";
import { useGoalList } from "../../hooks/module3/useGoalList";

function hex_color_switch(value) {
	switch (value) {
		case 0:
			return HEX_COLOR_NOT_RATED;
		case 1:
			return HEX_COLOR_VERY_LOW;
		case 2:
			return HEX_COLOR_LOW;
		case 3:
			return HEX_COLOR_REGULAR;
		case 4:
			return HEX_COLOR_HIGH;
		case 5:
			return HEX_COLOR_VERY_HIGH;
		default:
			return HEX_COLOR_NOT_RATED;
	}
}

const Dashboard = () => {
	const [user_info_id, setUserInfoID] = useState(null);
	
	const [ratings, setRatings] = useState([]);
	const [radarData, setRadarData] = useState([]);
	const [actionsCount, setActionsCount] = useState(0);
	const [skillsCount, setSkillsCount] = useState(0);
	const [achievementsCount, setAchievementsCount] = useState(0);
	const [shortQuestions, setShortQuestions] = useState(
		ASPECTS_QUESTIONS_SHORT
	);
	
	const { goals, refreshGoalList } = useGoalList();
	
	useEffect(() => {
		const { auth } = store.getState();
		const user_info_id = auth.user.user_info_id;
		setUserInfoID(user_info_id);
	}, []);
	
	useEffect(() => {
		const fetchDashData = async () => {
			try {
				const resp = await getDashboardData(user_info_id);
				if (resp.data) {
					const { radar_data, ratings, short_questions } = resp.data;
					setRadarData(radar_data);
					setRatings(ratings);
					setShortQuestions(short_questions);
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		const fetchSkillsData = async () => {
			try {
				const resp = await getSkills(user_info_id);
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
				const resp = await getAchievements(user_info_id);
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
				const resp = await getInProgressRoutineActionList(user_info_id);
				if (resp.data) {
					const actions = resp.data;
					setActionsCount(actions.length);
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		if (user_info_id) {
			fetchDashData();
			fetchSkillsData();
			fetchAchievementsData();
			fetchRoutineActionsData();
			refreshGoalList();
		}
	}, [user_info_id]);
	
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
				<Chart
					series={[
						{
							name: "Radar Series 1",
							data: radarData
						}
					]}
					height={600}
					type="radar"
					options={{
						dataLabels: {
							enabled: true,
							style: {
								colors: [getRadarColor(radarData)]
							}
						},
						chart: {
							toolbar: {
								show: false
							}
						},
						title: {
							text: "Radar de Qualidade de Vida",
							align: "left"
						},
						fill: {
							type: "solid",
							opacity: 0.5,
							colors: [getRadarColor(radarData)]
						},
						xaxis: {
							categories: ASPECTS_TYPES,
							labels: {
								show: true,
								style: {
									colors: ["#a8a8a8"],
									fontSize: "15px",
									fontFamily: "Arial"
								}
							}
						},
						yaxis: {
							min: 0,
							max: 5,
							forceNiceScale: false
						},
						stroke: {
							show: true,
							width: 2,
							colors: [getRadarColor(radarData)],
							dashArray: 0
						},
						markers: {
							colors: [getRadarColor(radarData)]
						},
						responsive: [
							{
								breakpoint: 640,
								options: {
									yaxis: {
										min: 0,
										max: 5,
										forceNiceScale: true
									},
									xaxis: {
										categories: ASPECTS_TYPES_SHORT,
										labels: {
											show: true,
											style: {
												fontSize: "10px",
												fontFamily: "Arial"
											}
										}
									},
								}
							}
						]
					}}
				/>
				<Chart
					series={[{ name: "Avaliação", data: ratings }]}
					height={500}
					type="bar"
					options={{
						chart: {
							toolbar: {
								show: false
							}
						},
						colors: [
							function({ value }) {
								switch (value) {
									case 0:
										return HEX_COLOR_NOT_RATED;
									case 1:
										return HEX_COLOR_VERY_LOW;
									case 2:
										return HEX_COLOR_LOW;
									case 3:
										return HEX_COLOR_REGULAR;
									case 4:
										return HEX_COLOR_HIGH;
									case 5:
										return HEX_COLOR_VERY_HIGH;
									default:
										return HEX_COLOR_NOT_RATED;
								}
							}
						],
						title: {
							text: "Perguntas x Avaliações",
							align: "left"
						},
						plotOptions: {
							bar: {
								borderRadius: 4,
								horizontal: true
							}
						},
						dataLabels: {
							enabled: false
						},
						stroke: {
							show: true,
							width: 2,
							colors: ["transparent"]
						},
						xaxis: {
							categories: shortQuestions
						},
						yaxis: {
							min: 0,
							max: 5,
							forceNiceScale: true,
							axisTicks: {
								show: true
							}
						},
						fill: {
							type: "gradient",
							opacity: 1
						}
					}}
				/>
			</div>
		</div>
	);
};

export default Dashboard;

const getRadarColor = (data) => {
	const sum = data.reduce((partialSum, a) => partialSum + a, 0);
	return hex_color_switch(Math.round(sum / 5));
};
