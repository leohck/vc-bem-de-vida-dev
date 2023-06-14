import React, { useCallback, useState } from 'react'
import { Radio, Segment } from '../../../components/ui'
import { Chart } from '../../../components/shared'

const CostBenefitChart = () => {
    const [lifeAspect, setLifeAspect] = useState('Saude Fisica')

    const handleFormInput = useCallback(
        (val) => {
            setLifeAspect(val)
        },
        [lifeAspect]
    )

    const data = [
        {
            name: 'Dinheiro',
            data: [44],
        },
        {
            name: 'Tempo',
            data: [76],
        },
        {
            name: 'Energia',
            data: [35],
        },
    ]

    return (
        <div className="flex flex-col justify-items-center">
            <div>
                <Segment
                    size="sm"
                    value={lifeAspect}
                    onChange={(val) => handleFormInput(val)}
                >
                    <Segment.Item value="Saude Fisica">
                        Saude Fisica
                    </Segment.Item>
                    <Segment.Item value="Saude Mental">
                        Saude Mental
                    </Segment.Item>
                    <Segment.Item value="Vida Social">Vida Social</Segment.Item>
                    <Segment.Item value="Vida Profissional">
                        Vida Profissional
                    </Segment.Item>
                    <Segment.Item value="Gestao Financeira">
                        Gestao Financeira
                    </Segment.Item>
                </Segment>
            </div>
            <div>
                <Chart
                    options={{
                        plotOptions: {
                            bar: {
                                borderRadius: 4,
                                horizontal: false,
                                columnWidth: '55%',
                                endingShape: 'rounded',
                                dataLabels: {
                                    position: 'top'
                                },
                            },
                        },
                        colors: ['#16a34a', '#2563eb', '#f59e0b'],
                        dataLabels: {
                            enabled: true,
                            position: 'top'
                        },
                        stroke: {
                            show: true,
                            width: 2,
                            colors: ['transparent'],
                        },
                        xaxis: {
                            categories: [lifeAspect],
                        },
                        fill: {
                            type: 'gradient',
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
    )
}

export default CostBenefitChart
