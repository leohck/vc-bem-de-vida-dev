import React from 'react'
import { Card } from '../../../components/ui'
import { GrowShrinkTag } from 'components/shared'


const BigNumberCard = (props) => {
    const {
        icon,
        value,
        label,
        tagValue,
        tagPrefix,
        tagSuffix,
        gray,
        reverse,
        showIcon,
        showPercentage = false,
        percentage = 0
    } = props
    return (
        <Card className="max-w-[240px] max-h-[240px] shadow-md shadow-blue-900/50 bg-[#DEE5FF]">
            <div className="flex flex-col items-center justify-items-center justify-evenly gap-2">
                <div>{icon}</div>
                {showPercentage ? (
                        <h2>{percentage}%</h2>
                ) : (
                    <h2>{value}</h2>
                )}
                <div>
                    <p>{label}</p>
                </div>
                <div>
                    <GrowShrinkTag
                        value={tagValue}
                        prefix={tagPrefix}
                        suffix={tagSuffix}
                        gray={gray}
                        reverse={reverse}
                        showIcon={showIcon}
                    />
                </div>
            </div>
        </Card>
    )
}

export default BigNumberCard
