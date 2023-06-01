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

    return (
        <div>
            <Card
                header={title}
                headerClass="flex items-center justify-center"
                // className="w-64 h-40 shadow-md shadow-yellow-400/50"
                className="w-64 h-40 shadow-md shadow-blue-900/50"
                bodyClass="grid grid-cols-3"
            >
                <div className="flex items-center justify-self-center col-span-2">
                    <h1 className="pl-16">{itemCount}</h1>
                </div>
                <div className="flex flex-col gap-2 w-10 max-w-10 justify-items-end justify-self-end">
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
            </Card>
        </div>
    );
};

export default CardWithDialog;
