import React from "react";
import { Card } from "../../../components/ui";
import { GrowShrinkTag } from "components/shared";

const BigNumberCard = props => {
    const {
        icon,
        value,
        label,
        tagValue,
        tagPrefix,
        tagSuffix,
        gray
    } = props;
    return (
        <Card className="max-w-[240px] max-h-[240px] shadow-md shadow-blue-900/50">
            <div className="flex flex-col items-center justify-items-center justify-evenly gap-2">
                <div>
                    {icon}
                </div>
                <div>
                    <h2>{value}</h2>
                </div>
                <div>
                    <p>{label}</p>
                </div>
                <div>
                    <GrowShrinkTag value={tagValue}
                                   prefix={tagPrefix}
                                   suffix={tagSuffix}
                                   gray={gray} />
                </div>
            </div>
        </Card>
    );
};

export default BigNumberCard;