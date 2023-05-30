import React from "react";
import { Input, Segment, Select, Tooltip } from "components/ui";
import { HiCheck, HiOutlineExclamationCircle, HiOutlineUser } from "react-icons/hi";
import { aptidoesOptions, conquistasGroupedOptions } from "views/auto-conhecimento/form.options";
import { components } from "react-select";
const { MultiValueLabel } = components

const Cadastro = () => {
    const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
        return (
            <div
                className={`flex items-center justify-between p-2 ${
                    isSelected
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                {...innerProps}
            >
                <div className="flex items-center">
                    {data.icon}
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }

    const CustomControlMulti = ({ children, data, ...props }) => {
        const { icon } = data
        return (
            <MultiValueLabel {...props}>
                <div className="inline-flex items-center">
                    {icon} &nbsp;
                    {children}
                </div>
            </MultiValueLabel>
        )
    }
    const formatGroupLabel = (data) => (
        <div className="font-bold text-xs uppercase text-gray-800 dark:text-white my-2">
            {data.label}
        </div>
    )
    return (
        <div className="grid grid-flow-row auto-rows-max gap-4">
            <div>
                Cadastro Inicial
            </div>
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
            <div>
                <span>Lista de Aptidoes</span>
                <Select
                    isMulti
                    placeholder="Lista de Aptidoes"
                    options={aptidoesOptions}
                />
            </div>
            <div>
                <span>Lista de Conquistas</span>
                <Select
                    isMulti
                    placeholder="Lista de Conquistas"
                    options={conquistasGroupedOptions}
                    components={{
                        Option: CustomSelectOption,
                        MultiValueLabel: CustomControlMulti
                    }}
                    formatGroupLabel={formatGroupLabel}
                    className="mb-4"
                />
            </div>
        </div>
    );
};

export default Cadastro;
