import React from 'react'
import { SegmentItemOption } from 'components/shared'
import { Segment } from 'components/ui'
import {LIFE_ASPECTS_OPTIONS} from "../../../constants/aspects.constant";


const LifeAspectSegment = ({ value, onChange }) => {
    return (
        <Segment value={value} selectionType="multiple" onChange={onChange}>
            <div className="flex flex-col xl:flex-row items-center gap-4">
                {LIFE_ASPECTS_OPTIONS.map((item) => (
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
                                        <span>
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
