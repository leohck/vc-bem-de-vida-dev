import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Input, Segment, Tooltip } from '../../components/ui'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import {
    addNewSourceIncome,
    updateSourceIncome,
} from '../../store/userinfo/sourceIncomeSlice'
import { getSourceIncome, postSourceIncome } from "../../services/SourceIncomeService";
import store from "../../store";

const SourceIncomeForm = (props) => {
    const { itemID, setItemID, formTitle, setFormTitle } = props

    const dispatch = useDispatch()
    const [incomeFrom, setIncomeFrom] = useState()
    const [incomeType, setIncomeType] = useState()
    const [incomeValue, setIncomeValue] = useState()
    const [user_info_id, setUserId] = useState();


    const cleanForm = () => {
        setIncomeFrom(null)
        setIncomeType(null)
        setIncomeValue(null)
        setItemID(null)
    }
    useEffect(() => {
        const { auth } = store.getState();
        const user_id = auth.user.user_info_id;
        setUserId(user_id);
    }, []);


    useEffect(() => {
        const get_sc = async () => {
            if (itemID) {
                await getSourceIncome(itemID).then(
                    response => {
                        setIncomeFrom(response.data.income_from)
                        setIncomeType([response.data.income_type])
                        setIncomeValue(response.data.income)
                    }
                )
            }
        }
        get_sc()
    }, [itemID])

    const handleIncomeTypeChange = useCallback((val) => {
        setIncomeType(val)
    }, [])

    const saveNewSourceIncome = (data) => {
        const update = async () => {
            try {
                const resp = await postSourceIncome(data, itemID)
                if (resp.data) {
                    console.log(resp.data)
                    if (itemID) {
                        dispatch(updateSourceIncome(resp.data))
                    } else {
                        dispatch(addNewSourceIncome(resp.data))
                    }
                    alert('Sucesso')
                    setFormTitle('Cadastrar')
                    cleanForm()
                }
            } catch (errors) {
                console.log(errors)
            }
        }
        update()
    }

    const handleFormSubmit = () => {
        const data = {
            user: user_info_id,
            income: incomeValue,
            income_from: incomeFrom,
            income_type: incomeType[0],
        }
        saveNewSourceIncome(data)
    }

    return (
        <Card header={`${formTitle} Renda Mensal`}>
            <div className="flex flex-row gap-4">
                <Input
                    value={incomeFrom}
                    onChange={(e) => {
                        setIncomeFrom(e.target.value)
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
                    <Segment.Item value="compartilhada">
                        Compartilhada
                    </Segment.Item>
                </Segment>
                <Input
                    value={incomeValue}
                    onChange={(e) => {
                        setIncomeValue(e.target.value)
                    }}
                    name="income"
                    className="max-w-[400px]"
                    placeholder="Renda Líquida Mensal"
                    prefix="R$"
                    type="number"
                />
                <Button variant="solid" onClick={handleFormSubmit}>
                    Salvar
                </Button>
            </div>
        </Card>
    )
}

export default SourceIncomeForm
