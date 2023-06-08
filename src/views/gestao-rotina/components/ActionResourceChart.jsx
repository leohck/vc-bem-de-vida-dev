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
            name: "Custo",
            data: data
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
                        horizontal: true,
                        dataLabels: {
                            position: "top"
                        }
                    }
                },
                colors: [color],
                dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                        fontSize: '12px',
                        colors: ['#fff']
                    }
                },
                xaxis: {
                    categories: categories
                }
            }}
        />
    );
};

export default ActionResourceChart;