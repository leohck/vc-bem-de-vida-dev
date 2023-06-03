import React from "react";
import GroupedBigNumberCards from "../components/GroupedBigNumberCards";
import WeeklyRoutineChart from "../components/WeeklyRoutineChart";
import CostBenefitChart from "../components/CostBenefitChart";


const Dashboard = () => {
    return (
        <div className="grid grid-cols-2 gap-2 justify-between">
            <GroupedBigNumberCards />
            <WeeklyRoutineChart />
            <CostBenefitChart />
            {/*<WeeklyRoutineChart />*/}
        </div>
    );
};

export default Dashboard;