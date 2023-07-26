import React from 'react'
import classNames from 'classnames'
import { Segment } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'
import { ASPECTS } from 'constants/aspects.constant'

const CustomSelector = ({ id, value, setValue }) => {
    return (
        <Segment
            value={value}
            onChange={(value) => setValue(id, value)}
            className="grid grid-cols-1 gap-5 md:grid-cols-5"
        >
            {ASPECTS.map((item, index) => (
                <Segment.Item
                    value={String(item.value)}
                    key={item.value}
                    disabled={item.disabled}
                >
                    {({ ref, active, onSegmentItemClick }) => {
                        return (
                            <div
                                ref={ref}
                                onClick={onSegmentItemClick}
                                className={classNames(
                                    'flex',
                                    'ring-1',
                                    'justify-between',
                                    'border',
                                    'rounded-md ',
                                    'border-gray-300',
                                    'py-5 px-4',
                                    'cursor-pointer',
                                    'select-none',
                                    'md:w-[260px]',
                                    active
                                        ? `ring-${item.color} border-${item.color}`
                                        : 'ring-transparent',
                                    `hover:ring-${item.color} hover:border-${item.color}`
                                )}
                            >
                                <h6>{item.label}</h6>
                                {active && (
                                    <HiCheckCircle
                                        className={`text-${item.color} text-xl`}
                                    />
                                )}
                            </div>
                        )
                    }}
                </Segment.Item>
            ))}
        </Segment>
    )
}

export default CustomSelector
