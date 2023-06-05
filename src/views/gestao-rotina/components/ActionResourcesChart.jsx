import React, { useState } from "react";
import { Segment } from "../../../components/ui";
import ActionResourceChart from "./ActionResourceChart";


const ActionResourcesChart = () => {


    const [chartFilter, setChartFilter] = useState(["money_spent"]);
    const [chartType, setChartType] = useState("money_spent");

    const handleChartFilterChange = (val) => {
        setChartFilter(val);
        setChartType(val[0]);
    };

    const GraphSegment = () => (
        <Segment onChange={handleChartFilterChange}
                 size={"xs"} value={chartFilter}>
            <Segment.Item value="money_spent">Dinheiro</Segment.Item>
            <Segment.Item value="time_spent">Tempo</Segment.Item>
            <Segment.Item value="energy_spent">Energia</Segment.Item>
        </Segment>
    );

    return (
        <div>
            <div className="grid justify-items-center">
                <h4>Ações / Consumo de Recurso</h4>
                <GraphSegment />
            </div>
            {chartType === "money_spent"
                ? <ActionResourceChart color={"#16a34a"} /> : null}
            {chartType === "time_spent"
                ? <ActionResourceChart color={"#2563eb"} /> : null}
            {chartType === "energy_spent"
                ? <ActionResourceChart color={"#f59e0b"} /> : null}

        </div>
    );
};

export default ActionResourcesChart;