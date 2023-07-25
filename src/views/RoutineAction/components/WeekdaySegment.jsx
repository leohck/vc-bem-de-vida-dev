import React from 'react'
import { SegmentItemOption } from 'components/shared'
import { Badge, Card, Segment } from 'components/ui'
import { FcCalendar } from 'react-icons/fc'

const week_days_options = [
    { label: 'Domingo', value: '0', icon: <FcCalendar /> },
    { label: 'Segunda', value: '1', icon: <FcCalendar /> },
    { label: 'Terça', value: '2', icon: <FcCalendar /> },
    { label: 'Quarta', value: '3', icon: <FcCalendar /> },
    { label: 'Quinta', value: '4', icon: <FcCalendar /> },
    { label: 'Sexta', value: '5', icon: <FcCalendar /> },
    { label: 'Sábado', value: '6', icon: <FcCalendar /> },
]

const WeekdaySegment = ({ value, onChange, weeklyHoursSpentCount }) => {
    const CounterCard = ({ value }) => {
        let bg = 'shadow-blue-900/50'
        if (value >= 24) {
            bg = 'bg-red-100 shadow-red-900/50'
        }
        return (
            <Card className={'max-w-[165px] max-h-[70px] shadow-sm ' + bg}>
                <div className="flex flex-col justify-items-center items-center">
                    <p>Horas Registradas</p>
                    {value}
                </div>
            </Card>
        )
    }

    return (
        <Segment value={value} onChange={onChange} selectionType="multiple">
            <div className="flex flex-col xl:flex-row items-center gap-4">
                {week_days_options.map((item) => (
                    <div className="flex flex-col gap-2">
                        <Segment.Item
                            value={item.value}
                            key={item.value}
                            disabled={item.disabled}
                        >
                            {({
                                ref,
                                active,
                                onSegmentItemClick,
                                disabled,
                            }) => {
                                return (
                                    <SegmentItemOption
                                        hoverable
                                        ref={ref}
                                        key={item.value}
                                        active={active}
                                        disabled={disabled}
                                        onSegmentItemClick={onSegmentItemClick}
                                        className="bg-white w-[165px] h-14"
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
                        <CounterCard
                            key={item.value + 'x'}
                            value={weeklyHoursSpentCount[parseInt(item.value)]}
                        />
                    </div>
                ))}
            </div>
        </Segment>
    )
}

export default WeekdaySegment
