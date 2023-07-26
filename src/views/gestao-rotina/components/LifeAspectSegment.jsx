import React from 'react'
import { SegmentItemOption } from 'components/shared'
import { Segment } from 'components/ui'

import { GiHealthNormal } from 'react-icons/gi'
import { RiMentalHealthFill, RiCoinsLine } from 'react-icons/ri'
import { MdGroups } from 'react-icons/md'
import { FaHandshake } from 'react-icons/fa'

const life_aspect_options = [
    {
        label: 'Saúde Física',
        value: 'Saude Fisica',
        icon: <GiHealthNormal />,
    },
    {
        label: 'Saúde Mental',
        value: 'Saude Mental',
        icon: <RiMentalHealthFill />,
    },
    {
        label: 'Vida Social',
        value: 'Vida Social',
        icon: <MdGroups />,
    },
    {
        label: 'Vida Profissional',
        value: 'Vida Profissional',
        icon: <FaHandshake />,
    },
    {
        label: 'Gestão Financeira',
        value: 'Gestao Financeira',
        icon: <RiCoinsLine />,
    },
]

const LifeAspectSegment = ({ value, onChange, singleOption, vertical }) => {
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
                        disabled={item.disabled}
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
                                        <span className="text-2xl">
                                            {item.icon}
                                        </span>
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
