import React, { useState } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { Segment } from "../../../components/ui";


const WeeklyRoutineChart = () => {
    const chartID = "weekly_time_and_energy_spent_chart";
    const time_spent = {
        name: "Tempo Consumido",
        data: [4, 12, 12, 14, 14, 14, 8]
    };

    const energy_spent = {
        name: "Energia Consumida",
        data: [2, 8, 8, 8, 8, 8, 8]
    };

    const [chartFilter, setChartFilter] = useState(["time_spent"]);
    const [chartData, setChartData] = useState([time_spent]);

    const handleChartFilterChange = (val) => {
        setChartFilter(val);
        switch (val[0]) {
            case "time_spent":
                setChartData([time_spent]);
                ApexCharts.exec(chartID, "updateOptions", {
                    series: [time_spent],
                    colors: ["#2563eb"],
                    tooltip: {
                        y: {
                            formatter: (val) => `${val} Horas`
                        }
                    }
                });
                break;
            case "energy_spent":
                setChartData([energy_spent]);
                ApexCharts.exec(chartID, "updateOptions", {
                    series: [energy_spent],
                    colors: ["#f59e0b"],
                    tooltip: {
                        y: {
                            formatter: (val) => `${val} %`
                        }
                    }
                });
                break;
            case "both":
                setChartData([time_spent, energy_spent]);
                ApexCharts.exec(chartID, "updateOptions", {
                    series: [time_spent, energy_spent],
                    colors: ["#2563eb", "#f59e0b"],
                    tooltip: {
                        y: {
                            formatter: (val) => val
                        }
                    }
                });
        }
    };

    const GraphSegment = () => (
        <Segment onChange={handleChartFilterChange}
                 size={"xs"} value={chartFilter}>
            <Segment.Item value="time_spent">Tempo</Segment.Item>
            <Segment.Item value="energy_spent">Energia</Segment.Item>
            <Segment.Item value="both">Tempo & Energia</Segment.Item>
        </Segment>
    );

    return (
        <div>
            <div className="grid justify-items-center">
                <h4>Rotina Semanal Tempo & Energia</h4>
                <GraphSegment />
            </div>

            <Chart
                series={chartData}
                height={350}
                type="bar"
                options={{
                    chart: {
                        id: chartID
                    },
                    legend: {
                        show: true
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "55%",
                            endingShape: "rounded",
                            dataLabels: {
                                position: "top"
                            }
                        }
                    },
                    colors: ["#2563eb"],
                    dataLabels: {
                        enabled: true
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: [
                            "Domingo",
                            "Segunda",
                            "Terça",
                            "Quarta",
                            "Quinta",
                            "Sexta",
                            "Sábado"
                        ]
                    },
                    yaxis: {
                        title: {
                            text: "Horas Disponíveis"
                        },
                        min: 0,
                        max: 24,
                        forceNiceScale: true
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: (val) => `${val} Horas`
                        }
                    }
                }}
            />
        </div>
    );
};

export default WeeklyRoutineChart;