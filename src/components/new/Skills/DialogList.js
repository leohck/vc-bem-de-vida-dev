import React, { useState } from "react";
import { Button, Dialog } from "components/ui";
import { FaListUl } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteSkill } from "../../../services/PersonalService";

const DialogList = (props) => {
    const [dialogIsOpen, setIsOpen] = useState(false);
    const { skills, setSkills, skillsCount, setSkillsCount } = props;

    const openDialog = () => {
        setIsOpen(true);
    };

    const onDialogClose = () => {
        setIsOpen(false);
    };

    const ItemRow = ({ item }) => {
        const [dialogIsOpen, setIsOpen] = useState(false);
        const openDialog = () => {
            setIsOpen(true);
        };

        const onDialogClose = () => {
            setIsOpen(false);
        };

        const onDialogOk = () => {
            const deleteItem = (key) => {
                setSkills((current) =>
                    current.filter(
                        ({ id }) => id !== key
                    )
                );
                setSkillsCount(skillsCount - 1);
            };
            const delSkill = async () => {
                try {
                    const resp = await deleteSkill(item.id);
                    if (resp.status === 204) {
                        deleteItem(item.id);
                    }
                } catch (errors) {
                    console.log(errors);
                }
            }
            delSkill();
            setIsOpen(false);
        };
        return (
            <div className="flex justify-between my-2">
                <h5>{item.skill}</h5>
                <Button
                    shape="circle"
                    color={"red-500"}
                    size="sm"
                    variant="twoTone"
                    icon={<MdDeleteForever />}
                    onClick={() => openDialog()} />
                <Dialog
                    isOpen={dialogIsOpen}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <h5 className="mb-4">Excluir Habilidade</h5>
                    <p>
                        Tem certeza que deseja excluir a Habilidade:
                        <h6> {item.skill}?</h6>
                    </p>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            Cancelar
                        </Button>
                        <Button variant="solid"
                                color="red-500"
                                onClick={onDialogOk}>
                            Excluir
                        </Button>
                    </div>
                </Dialog>
            </div>
        );
    };

    return (
        <div>
            <Button
                shape="circle"
                size="sm"
                variant="twoTone"
                icon={<FaListUl />}
                onClick={() => openDialog()} />
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Lista de Habilidades</h5>
                <div className="max-h-96 overflow-y-auto">
                    {skills.map((item) =>
                        <ItemRow key={item.id}
                                 item={item}
                        />
                    )}
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Fechar
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default DialogList;

