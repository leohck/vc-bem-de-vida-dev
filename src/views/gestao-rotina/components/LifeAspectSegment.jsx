import React from 'react'
import { SegmentItemOption } from 'components/shared'
import { Segment } from 'components/ui'

import LifeAspectIcon from "../../Icon";

const life_aspect_options = [
    {
        label: 'Saúde Física',
        value: 'Saude Fisica',
        icon: <LifeAspectIcon life_aspect={'saude_fisica'}/>,
    },
    {
        label: 'Saúde Mental',
        value: 'Saude Mental',
        icon: <LifeAspectIcon life_aspect={'saude_mental'}/>,
    },
    {
        label: 'Vida Social',
        value: 'Vida Social',
        icon: <LifeAspectIcon life_aspect={'vida_social'}/>,
    },
    {
        label: 'Vida Profissional',
        value: 'Vida Profissional',
        icon: <LifeAspectIcon life_aspect={'vida_profissional'}/>,
    },
    {
        label: 'Gestão Financeira',
        value: 'Gestao Financeira',
        icon: <LifeAspectIcon life_aspect={'gestao_financeira'}/>,
    },
]

const LifeAspectSegment = ({ value, onChange, singleOption, vertical, isDisabled }) => {
    const className = vertical ? "flex flex-col justify-between" : "flex flex-col md:flex-row items-center gap-4"
    return (
        <Segment
                 value={value}
                 selectionType={!singleOption ? "multiple" : "single"}
                 onChange={onChange}
        >
            <div className={className}>
                {life_aspect_options.map((item) => (
                    <Segment.Item
                        value={item.value}
                        key={item.value}
                        disabled={isDisabled ? isDisabled : item.disabled}
                    >
                        {({ ref, active, onSegmentItemClick, disabled }) => {
                            return (
                                <SegmentItemOption
                                    hoverable
                                    ref={ref}
                                    active={active}
                                    disabled={disabled}
                                    onSegmentItemClick={onSegmentItemClick}
                                    className="bg-white dark:bg-gray-800 w-[230px] h-16"
                                >
                                    <div className="flex items-center gap-3">
                                        <div>
                                            {item.icon}
                                        </div>
                                        <h6>{item.label}</h6>
                                    </div>
                                </SegmentItemOption>
                            )
                        }}
                    </Segment.Item>
                ))}
            </div>
        </Segment>
    )
}

export default LifeAspectSegment
