import React  from "react";
import Chart from "react-apexcharts";


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

    const chartData = [time_spent, energy_spent];

    return (
        <div>
            <div className="grid justify-items-center">
                <h4>Rotina Semanal Tempo & Energia</h4>
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
                    colors: ["#2563eb", "#f59e0b"],
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
                    }
                }}
            />
        </div>
    );
};

export default WeeklyRoutineChart;