import React, { useState, useEffect, useRef } from "react";
import GroupedBigNumberCards from "../components/GroupedBigNumberCards";
import WeeklyRoutineChart from "../components/WeeklyRoutineChart";
import CostBenefitChart from "../components/CostBenefitChart";
import ActionResourcesChart from "../components/ActionResourcesChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "store/userinfo/userInfoSlice";
import {
    getDashboard2Data,
    getDashboard2ActionData
} from "../../../services/PersonalService";


const Dashboard = () => {
    const dispatch = useDispatch();
    const userInfoLoaded = useRef(false);
    const user_info = useSelector((state) => state.userinfo.userInfoState);
    const [user_info_id, setUserInfoID] = useState(null);
    const [card1Value, setCard1Value] = useState({ value: 0, tagValue: 0 });
    const [card2Value, setCard2Value] = useState({ value: 0, tagValue: 0 });
    const [card3Value, setCard3Value] = useState({ value: 0, tagValue: 0 });
    const [card4Value, setCard4Value] = useState({ value: 0, tagValue: 0 });
    const [weeklyRoutineChartData, setWeeklyRoutineChartData] = useState({
        categories: [
            "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
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
                const {
                    monthly_financial_balance, hourly_active_income,
                    hourly_unprofitable_cost, weekly_free_time,
                    weekly_routine_time_and_energy
                } = resp.data;
                setCard1Value({ value: monthly_financial_balance, tagValue: 8000 });
                setCard2Value({ value: hourly_active_income, tagValue: 72.85 });
                setCard3Value({ value: weekly_free_time, tagValue: -28 });
                setCard4Value({ value: hourly_unprofitable_cost, tagValue: 11 });
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
                setActionResourceChartData({ top_5_ra_by_money,
                    top_5_ra_by_time_spent, top_5_ra_by_energy_spent });
            }
        } catch (errors) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (!userInfoLoaded.current) {
            dispatch(fetchUserInfo());
        }
        if (!user_info.loading && user_info.currentUser) {
            setUserInfoID(user_info.currentUser.id);
            return () => {
                userInfoLoaded.current = true;
            };
        }
        if (userInfoLoaded.current) {
            fetchDashData();
        }
    }, [user_info]);
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
            {/*<CostBenefitChart />*/}
            <h6>Custo X Beneficio </h6>
            <ActionResourcesChart data={actionResourceChartData} />
        </div>
    );
};

export default Dashboard;