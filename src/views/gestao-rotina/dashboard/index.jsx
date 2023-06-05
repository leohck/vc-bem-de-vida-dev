import React from "react";
import GroupedBigNumberCards from "../components/GroupedBigNumberCards";
import WeeklyRoutineChart from "../components/WeeklyRoutineChart";
import CostBenefitChart from "../components/CostBenefitChart";
import ActionResourcesChart from "../components/ActionResourcesChart";


const Dashboard = () => {
    return (
        <div className="grid grid-cols-2 gap-2 justify-between">
            <div className="grid justify-items-center items-center">
                <GroupedBigNumberCards />
            </div>
            <WeeklyRoutineChart />
            <CostBenefitChart />
            <ActionResourcesChart />
        </div>
    );
};

export default Dashboard;