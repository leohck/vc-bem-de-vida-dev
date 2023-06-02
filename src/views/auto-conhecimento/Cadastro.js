import React from "react";
import { Input, Segment, Tooltip } from "components/ui";
import { HiOutlineExclamationCircle, HiOutlineUser } from "react-icons/hi";
// import { useDispatch } from "react-redux";
// import { fetchUserInfo } from "../../store/userinfo/userInfoSlice";

const Cadastro = () => {
    return (
        <div className="grid grid-flow-row auto-rows-max gap-4">
            <h3>Cadastro Inicial</h3>
            <div>
                <Input placeholder="Nome"
                       prefix={<HiOutlineUser className="text-lg" />}
                />
            </div>
            <div>
                <span>Estado Civil</span>
                <Segment>
                    <Segment.Item value="1">Solteiro</Segment.Item>
                    <Segment.Item value="2">Uniao Estavel</Segment.Item>
                    <Segment.Item value="3">Casado</Segment.Item>
                    <Segment.Item value="4">Viuvo</Segment.Item>
                </Segment>
            </div>
            <div>
                <span>Renda Mensal</span>
                <div className="mb-4">
                    <Input
                        placeholder="Renda Mensal"
                        prefix="R$"
                        suffix=".00"
                        type="number"
                    />
                </div>
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
                        <Segment.Item value="1">Ativa</Segment.Item>
                        <Segment.Item value="2">Passiva</Segment.Item>
                        <Segment.Item value="3">Compartilhada</Segment.Item>
                    </Segment>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
