import React, { useState } from "react";
import { SegmentItemOption } from "components/shared";
import { Segment } from "components/ui";

import { GiHealthPotion } from "react-icons/gi";
import { RiMentalHealthFill, RiCoinsLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

const life_aspect_options = [
    { label: "Saúde Física", value: "Saude Fisica",
        icon: <GiHealthPotion /> },
    { label: "Saúde Mental", value: "Saude Mental",
        icon: <RiMentalHealthFill /> },
    { label: "Vida Social", value: "Vida Social",
        icon: <MdGroups /> },
    { label: "Vida Profissional", value: "Vida Profissional",
        icon: <FaHandshake /> },
    { label: "Gestão Financeira", value: "Gestao Financeira",
        icon: <RiCoinsLine /> }
];

const LifeAspectSegment = () => {
    const [value, setValue] = useState([life_aspect_options[0].value]);

    const handleChange = (val) => {
        console.log("val", val);
        setValue(val);
    };

    return (
        <Segment value={value} onChange={handleChange} selectionType="multiple">
            <div className="flex flex-col xl:flex-row items-center gap-4">
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
                            );
                        }}
                    </Segment.Item>
                ))}
            </div>
        </Segment>
    );
};

export default LifeAspectSegment;

