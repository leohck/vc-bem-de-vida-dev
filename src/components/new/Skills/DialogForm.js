import React, { useState } from "react";
import { Button, Dialog, Select } from "components/ui";
import { FaPlusSquare } from "react-icons/fa";
import { aptidoesOptions } from "../../../views/auto-conhecimento/form.options";
import { postSkills } from "../../../services/PersonalService";
import CreatableSelect from "react-select/creatable";

const DialogForm = ({ skills, setSkills, skillsCount, setSkillsCount }) => {
    const [dialogIsOpen, setIsOpen] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const user_info_id = 8;
    const openDialog = () => {
        setIsOpen(true);
    };

    const onDialogClose = (e) => {
        setIsOpen(false);
    };

    const onDialogOk = (e) => {
        setIsOpen(false);
        addSkill(user_info_id, newSkill);
    };

    const addSkill = (id, value) => {
        const update = async () => {
            try {
                const resp = await postSkills({ user: id, skill: value });
                if (resp.data) {
                    console.log(resp.data);
                    setSkillsCount(skillsCount + 1);
                    setSkills([...skills, resp.data]);
                }
            } catch (errors) {
                console.log(errors);
            }
        };
        update();
    };

    const filteredSkillsOptions = aptidoesOptions.filter(ad =>
        skills.every(fd => fd.skill !== ad.label)
    );
    return (
        <div>
            <Button
                shape="circle"
                size="sm"
                variant="twoTone"
                icon={<FaPlusSquare />}
                onClick={() => openDialog()} />
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Cadastrar Nova Habilidade</h5>
                <div>
                    <span>Lista de Habilidades</span>
                    <Select
                        isClearable={false}
                        isMulti={false}
                        placeholder="Lista de Aptidoes"
                        options={filteredSkillsOptions}
                        onChange={({ label }) => setNewSkill(label)}
                        componentAs={CreatableSelect}
                    />
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancelar
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Salvar
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default DialogForm;

