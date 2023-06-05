import React  from "react";
import { Segment } from "components/ui";
import { RiBatteryChargeLine } from "react-icons/ri";
import classNames from "classnames";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";


const action_money_options = [
    {
        label: "Gera Dinheiro", value: "1",
        color: "green-600", icon: <RiBatteryChargeLine />
    },
    {
        label: "Custa Dinheiro", value: "0",
        color: "red-700", icon: <RiBatteryChargeLine />
    },
];


const ActionMoneySegment = ({ value, onChange }) => {
    return (
        <Segment value={value}
                 onChange={onChange}
                 selectionType="multiple"
        >
            <div className="flex flex-col xl:flex-row items-center gap-4">
                {action_money_options.map((item) => (
                    <Segment.Item
                        value={item.value}
                        key={item.value}
                        disabled={item.disabled}
                    >
                        {({ ref, active, onSegmentItemClick }) => {
                            return (
                                <div ref={ref}
                                     onClick={onSegmentItemClick}
                                     className={classNames(
                                         "flex",
                                         "ring-1",
                                         "items-center",
                                         "justify-between",
                                         "border",
                                         "rounded-md ",
                                         "border-gray-300",
                                         "py-5 px-4",
                                         "cursor-pointer",
                                         "select-none",
                                         "w-100",
                                         "md:w-[200px]",
                                         "h-16",
                                         "md:h-[16px]",
                                         active
                                             ? `ring-${item.color} border-${item.color}`
                                             : "ring-transparent",
                                         `hover:ring-${item.color} hover:border-${item.color}`
                                     )}
                                >
                                    <>
                                        <h6>{item.label}</h6>
                                        {active && item.value === "0" ? (
                                            <MdMoneyOff className={`text-${item.color} text-xl`} />
                                        ) : null}
                                        {active && item.value === "1" ? (
                                            <MdAttachMoney className={`text-${item.color} text-xl`} />
                                        ) : null}

                                    </>
                                </div>

                            );
                        }}
                    </Segment.Item>
                ))}
            </div>
        </Segment>
    );
};

export default ActionMoneySegment;

