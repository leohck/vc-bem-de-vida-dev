import React, { useState, useEffect } from "react";
import GroupedBigNumberCards from "../components/GroupedBigNumberCards";
import WeeklyRoutineChart from "../components/WeeklyRoutineChart";
import CostBenefitChart from "../components/CostBenefitChart";
import ActionResourcesChart from "../components/ActionResourcesChart";
import {
	getDashboard2Data,
	getDashboard2ActionData
} from "../../../services/PersonalService";
import store from "../../../store";

const Dashboard = () => {
	const [user_info_id, setUserInfoID] = useState(null);
	const [card1Value, setCard1Value] = useState({ value: 0, tagValue: 0 });
	const [card2Value, setCard2Value] = useState({ value: 0, tagValue: 0 });
	const [card3Value, setCard3Value] = useState({ value: 0, tagValue: 0 });
	const [card4Value, setCard4Value] = useState({ value: 0, tagValue: 0 });
	const [weeklyRoutineChartData, setWeeklyRoutineChartData] = useState({
		categories: [
			"Domingo",
			"Segunda",
			"Terça",
			"Quarta",
			"Quinta",
			"Sexta",
			"Sábado"
		],
		time_spent: [],
		energy_spent: [],
		average_energy_by_time: 0
	});
	const [actionResourceChartData, setActionResourceChartData] = useState({
		top_5_ra_by_money: {
			categories: [],
			data: []
		},
		top_5_ra_by_time_spent: {
			categories: [],
			data: []
		},
		top_5_ra_by_energy_spent: {
			categories: [],
			data: []
		}
	});

	const fetchDashData = async () => {
		try {
			const resp = await getDashboard2Data(user_info_id);
			if (resp.data) {
				console.log(resp.data);

				const {
					monthly_financial_balance,
					hourly_active_income,
					hourly_unprofitable_cost,
					weekly_free_time,
					weekly_routine_time_and_energy
				} = resp.data;
				setCard1Value({
					value: monthly_financial_balance,
					tagValue: 0
				});
				setCard2Value({ value: hourly_active_income, tagValue: 0 });
				setCard3Value({ value: weekly_free_time, tagValue: 0 });
				setCard4Value({ value: hourly_unprofitable_cost, tagValue: 0 });
				setWeeklyRoutineChartData(weekly_routine_time_and_energy);
			}
		} catch (errors) {
			console.log(errors);
		}
		try {
			const resp = await getDashboard2ActionData(user_info_id);
			if (resp.data) {
				const {
					top_5_ra_by_money,
					top_5_ra_by_time_spent,
					top_5_ra_by_energy_spent
				} = resp.data;
				setActionResourceChartData({
					top_5_ra_by_money,
					top_5_ra_by_time_spent,
					top_5_ra_by_energy_spent
				});
			}
		} catch (errors) {
			console.log(errors);
		}
	};

	useEffect(() => {
		const { auth } = store.getState();
		const user_info = auth.user.user_info_id;
		setUserInfoID(user_info);
		if (user_info_id) {
			fetchDashData();
		}
	}, [user_info_id]);

	return (
		<div className="grid grid-cols-2 gap-2 justify-between">
			<div className="grid justify-items-center items-center">
				<GroupedBigNumberCards
					card1Value={card1Value}
					card2Value={card2Value}
					card3Value={card3Value}
					card4Value={card4Value}
				/>
			</div>
			<WeeklyRoutineChart data={weeklyRoutineChartData} />
			<CostBenefitChart />
			<ActionResourcesChart data={actionResourceChartData} />
		</div>
	);
};

export default Dashboard;
