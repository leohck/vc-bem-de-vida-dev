import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Input, Segment, Tooltip } from "../../components/ui";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addNewSourceIncome, updateSourceIncome } from "../../store/userinfo/sourceIncomeSlice";
import { postSourceIncome } from "../../services/PersonalService";
import axios from "axios";

const SourceIncomeForm = (props) => {
    const {
        user_info_id,
        itemID,
        setItemID,
        formTitle,
        setFormTitle
    } = props;

    const dispatch = useDispatch();
    const [incomeFrom, setIncomeFrom] = useState();
    const [incomeType, setIncomeType] = useState();
    const [incomeValue, setIncomeValue] = useState();

    const cleanForm = () => {
        setIncomeFrom(null);
        setIncomeType(null);
        setIncomeValue(null);
        setItemID(null);
    };

    useEffect(() => {
        if (itemID) {
            axios
                .get(`http://127.0.0.1:8000/user_source_income/${itemID}/`)
                .then(response => {
                    setIncomeFrom(response.data.income_from);
                    setIncomeType([response.data.income_type]);
                    setIncomeValue(response.data.income);
                });
        }
    }, [itemID]);


    const handleIncomeTypeChange = useCallback(
        val => {
            setIncomeType(val);
        }, []
    );

    const saveNewSourceIncome = (data) => {
        const update = async () => {
            try {
                const resp = await postSourceIncome(data, itemID);
                if (resp.data) {
                    console.log(resp.data);
                    if (itemID) {
                        dispatch(updateSourceIncome(resp.data));
                    } else {
                        dispatch(addNewSourceIncome(resp.data));
                    }
                    alert("Sucesso");
                    setFormTitle("Cadastrar");
                    cleanForm();
                }
            } catch (errors) {
                console.log(errors);
            }
        };
        update();
    };

    const handleFormSubmit = () => {
        const data = {
            "user": user_info_id,
            "income": incomeValue,
            "income_from": incomeFrom,
            "income_type": incomeType[0]
        };
        saveNewSourceIncome(data);
    };

    return (
        <Card header={`${formTitle} Renda Mensal`}>
            <div className="flex flex-row gap-4">
                <Input
                    value={incomeFrom}
                    onChange={(e) => {
                        setIncomeFrom(e.target.value);
                    }}
                    name="income_from"
                    className="max-w-[400px]"
                    placeholder="Tipo de Renda"
                    suffix={
                        <Tooltip title="Aluguel, Freelancer, CLT">
                            <HiOutlineExclamationCircle className="text-lg cursor-pointer ml-1" />
                        </Tooltip>
                    }
                />
                <Segment value={incomeType} onChange={handleIncomeTypeChange}>
                    <Segment.Item value="ativa">Ativa</Segment.Item>
                    <Segment.Item value="passiva">Passiva</Segment.Item>
                    <Segment.Item value="compartilhada">Compartilhada</Segment.Item>
                </Segment>
                <Input
                    value={incomeValue}
                    onChange={(e) => {
                        setIncomeValue(e.target.value);
                    }}
                    name="income"
                    className="max-w-[400px]"
                    placeholder="Renda Mensal"
                    prefix="R$"
                    suffix=".00"
                    type="number"
                />
                <Button
                    variant="solid"
                    onClick={handleFormSubmit}
                >
                    Salvar
                </Button>
            </div>
        </Card>
    );
};

export default SourceIncomeForm;
