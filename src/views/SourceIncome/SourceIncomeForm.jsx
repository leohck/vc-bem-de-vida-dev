import React from "react"
import { Input, Segment, Tooltip } from "../../components/ui";
import { HiOutlineExclamationCircle } from "react-icons/hi";


const SourceIncomeForm = () => {
    return (
        <div>
            <span>Renda Mensal</span>
            <div className="mb-4">
                <Input
                    placeholder="Tipo de Renda"
                    suffix={
                        <Tooltip title="Aluguel, Freelancer, CLT">
                            <HiOutlineExclamationCircle className="text-lg cursor-pointer ml-1" />
                        </Tooltip>
                    }
                />
            </div>
            <div className="mb-4">
                <span>Classificar Renda</span>
                <Segment>
                    <Segment.Item value="ativa">Ativa</Segment.Item>
                    <Segment.Item value="passiva">Passiva</Segment.Item>
                    <Segment.Item value="compartilhada">Compartilhada</Segment.Item>
                </Segment>
            </div>
            <div className="mb-4">
                <Input
                    placeholder="Renda Mensal"
                    prefix="R$"
                    suffix=".00"
                    type="number"
                />
            </div>
        </div>
    )
}

export default SourceIncomeForm;
