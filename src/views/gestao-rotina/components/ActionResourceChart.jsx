import React  from "react";
import { Chart } from "../../../components/shared";


const ActionResourceChart = (props) => {
    const {
        data,
        categories,
        color
    } = props;
    const data1 = [
        {
            data: [1380, 1200, 1100, 470, 540]
        }
    ];
    return (
        <Chart
            series={data1}
            type="bar"
            height={400}
            options={{
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                colors: [color],
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: [
                        "South Korea",
                        "Canada",
                        "United Kingdom",
                        "Netherlands",
                        "Italy"
                    ]
                }
            }}
        />
    );
};

export default ActionResourceChart;