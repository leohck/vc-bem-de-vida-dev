import React from 'react'
import { Segment } from 'components/ui'
import { RiBatteryChargeLine } from 'react-icons/ri'
import classNames from 'classnames'

const energy_level_options = [
    { label: '0', value: '0', color: 'red-700', icon: <RiBatteryChargeLine /> },
    { label: '1', value: '1', color: 'red-400' },
    { label: '2', value: '2', color: 'red-300' },
    { label: '3', value: '3', color: 'orange-300' },
    { label: '4', value: '4', color: 'orange-400' },
    { label: '5', value: '5', color: 'yellow-300' },
    { label: '6', value: '6', color: 'yellow-400' },
    { label: '7', value: '7', color: 'green-300' },
    { label: '8', value: '8', color: 'green-400' },
    { label: '9', value: '9', color: 'emerald-400' },
    { label: '10', value: '10', color: 'green-500' },
]

const EnergyLevelSegment = ({ value, onChange }) => {
    return (
        <Segment value={value} onChange={onChange} selectionType="single">
            <div className="flex flex-col xl:flex-row items-center gap-4">
                {energy_level_options.map((item) => (
                    <Segment.Item
                        value={item.value}
                        key={item.value}
                        disabled={item.disabled}
                    >
                        {({ ref, active, onSegmentItemClick }) => {
                            return (
                                <div
                                    ref={ref}
                                    onClick={onSegmentItemClick}
                                    className={classNames(
                                        'flex items-center justify-center',
                                        'ring-1',
                                        'border',
                                        'rounded-md',
                                        'border-gray-300',
                                        item.value !== '0'
                                            ? 'py-5 px-4'
                                            : 'py-1 px-1',
                                        'cursor-pointer',
                                        'select-none',
                                        'w-96',
                                        'md:w-[96px]',
                                        'font-bold',
                                        'h-12',
                                        active
                                            ? `text-white ring-${item.color} border-${item.color} bg-${item.color}`
                                            : 'ring-transparent',
                                        `hover:ring-${item.color} hover:border-${item.color}`
                                    )}
                                >
                                    {item.value === '0' ? (
                                        <RiBatteryChargeLine
                                            size="5em"
                                            className="h-12"
                                        />
                                    ) : (
                                        <p
                                            className={classNames(
                                                'text-lg',
                                                active
                                                    ? 'text-white font-bold'
                                                    : 'text-black font-bold'
                                            )}
                                        >
                                            {item.label}
                                        </p>
                                    )}
                                </div>
                            )
                        }}
                    </Segment.Item>
                ))}
            </div>
        </Segment>
    )
}

export default EnergyLevelSegment
