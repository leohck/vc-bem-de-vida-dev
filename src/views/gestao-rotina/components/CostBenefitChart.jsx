import React, { useState } from "react";
import { Radio } from "../../../components/ui";
import { Chart } from "../../../components/shared";


const CostBenefitChart = () => {
    const [value, setValue] = useState('Banana')

    const onChange = (val) => {
        setValue(val)
    }
    const data = [
        {
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ]

    return (
        <div className="grid grid-cols-2 justify-between items-center">
            <div>
                <Radio.Group vertical value={value} onChange={onChange}>
                    <Radio value={'Apple'}>Apple</Radio>
                    <Radio value={'Banana'}>Banana</Radio>
                    <Radio value={'Cherry'}>Cherry</Radio>
                </Radio.Group>
            </div>
            <div>
                <Chart
                    options={{
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '55%',
                                endingShape: 'rounded',
                            },
                        },
                        colors: ["#16a34a", "#2563eb", "#f59e0b"],
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            show: true,
                            width: 2,
                            colors: ['transparent'],
                        },
                        xaxis: {
                            categories: [
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'Jun',
                                'Jul',
                                'Aug',
                                'Sep',
                                'Oct',
                            ],
                        },
                        fill: {
                            opacity: 1,
                        },
                        tooltip: {
                            y: {
                                formatter: (val) => `$${val} thousands`,
                            },
                        },
                    }}
                    series={data}
                    height={500}
                    type="bar"
                />
            </div>
        </div>
    );
};

export default CostBenefitChart;