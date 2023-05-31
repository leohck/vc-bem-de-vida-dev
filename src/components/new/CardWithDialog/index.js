import React from "react";
import { Card } from "components/ui";
import DialogForm from "../Skills/DialogForm";
import DialogList from "../Skills/DialogList";

const CardWithDialog = props => {
    const {
        title,
        itemType,
        itemList,
        setItemList,
        itemCount,
        setItemCount
    } = props;

    const cardFooter = (
        <div className="flex justify-between">
            <DialogList
                itemType={itemType}
                itemList={itemList}
                setItemList={setItemList}
                itemCount={itemCount}
                setItemCount={setItemCount}
            />
            <DialogForm
                itemType={itemType}
                skills={itemList}
                setSkills={setItemList}
                skillsCount={itemCount}
                setSkillsCount={setItemCount}
            />
        </div>
    );

    return (
        <div>
            <Card
                className="w-80"
                bodyClass="text-center"
                footer={cardFooter}
            >
                <div className="grid justify-items-center">
                    <h5 className={"mb-4"}>{title}</h5>
                    <h1>{itemCount}</h1>
                </div>
            </Card>
        </div>
    );
};

export default CardWithDialog;

