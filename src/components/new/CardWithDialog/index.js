import React, { useEffect, useState, useRef } from "react";
import { Card } from "components/ui";
import { getSkills } from "../../../services/PersonalService";
import DialogForm from "../Skills/DialogForm";
import DialogList from "../Skills/DialogList";

const CardWithDialog = (props) => {
    const effectRan = useRef(false);
    const [skills, setSkills] = useState([]);
    const [skillsCount, setSkillsCount] = useState(0);

    useEffect(() => {
        if (effectRan.current === false) {
            const fetchDashData = async () => {
                try {
                    const resp = await getSkills();
                    if (resp.data) {
                        const skills  = resp.data;
                        setSkills(skills)
                        setSkillsCount(skills.length)
                    }
                } catch (errors) {
                    console.log(errors);
                }
            };
            fetchDashData();
            return () => {
                effectRan.current = true;
            };
        }
    }, []);

    const cardFooter = (
        <div className="flex justify-between">
            <DialogList skills={skills}
                        setSkills={setSkills}
                        skillsCount={skillsCount}
                        setSkillsCount={setSkillsCount}
            />
            <DialogForm skills={skills}
                        setSkills={setSkills}
                        skillsCount={skillsCount}
                        setSkillsCount={setSkillsCount}
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
                    <h5 className={"mb-4"}>{props.title}</h5>
                    <h1>{skillsCount}</h1>
                </div>
            </Card>
        </div>
    );
};

export default CardWithDialog;

