import React, { useState } from "react";
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    InputGroup,
    Radio
} from "components/ui";
import { Formik, Field, Form } from "formik";

const Layout = () => {

    const [value, setValue] = useState();
    const life_aspect_options = [
        { label: "Saude Fisica", value: "Saúde Física" },
        { label: "Saude Mental", value: "Saúde Mental" },
        { label: "Vida Social", value: "Vida Social" },
        { label: "Vida Profissional", value: "Vida Profissional" },
        { label: "Gestao Financeira", value: "Gestão Financeira" }
    ];
    const onChange = (val) => {
        setValue(val);
    };
    const week_days_options = [
        { label: "Domingo", value: 0 },
        { label: "Segunda", value: 1 },
        { label: "Terça", value: 2 },
        { label: "Quarta", value: 3 },
        { label: "Quinta", value: 4 },
        { label: "Sexta", value: 5 },
        { label: "Sábado", value: 6 }
    ];

    const energy_level_options = [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 }
    ];


    return (
        <div>
            <div className="mb-8 grid justify-items-center">
                <h3>Cadastrar Ação de Rotina</h3>
            </div>
            <Formik
                initialValues={{
                    routine_action: "",
                    life_aspect: "",
                    hours_per_day: "",
                    week_days: "",
                    energy_level: "",
                    action_cost_money: "",
                    how_much_action_cost: "",
                    action_generate_money: ""
                }}
                onSubmit={async (values) => {
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form>
                    <FormContainer layout="vertical">
                        <FormItem label="Ação de Rotina">
                            <Field
                                type="text"
                                name="routine_action"
                                placeholder="Nome da Ação de Rotina"
                                component={Input}
                            />
                        </FormItem>

                        <FormItem label="Aspecto de Vida Influenciado pela Ação">
                            <Radio.Group value={value}
                                         onChange={onChange}
                                         name="life_aspect">
                                {life_aspect_options.map(opt => (
                                    <Radio value={opt.value}>{opt.label}</Radio>
                                ))}
                            </Radio.Group>
                        </FormItem>

                        <FormItem label="Quantas horas / dia são necessárias para esta ação" layout="horizontal">
                            <Field
                                type="number"
                                name="hours_per_day"
                                placeholder="Quantas horas no seu dia você precisa para esta ação"
                                component={Input}
                            />
                        </FormItem>

                        <FormItem label="Em quais dias da semana esta ação é executada?">
                            <Radio.Group value={value}
                                         onChange={onChange}
                                         name="week_days">
                                {week_days_options.map(opt => (
                                    <Radio value={opt.value}>{opt.label}</Radio>
                                ))}
                            </Radio.Group>
                        </FormItem>

                        <FormItem
                            label="Considerando a escala abaixo, como você classifica o nível de energia (esforço/atenção) despendido nesta ação">
                            <Radio.Group value={value}
                                         onChange={onChange}
                                         name="energy_level">
                                {energy_level_options.map(opt => (
                                    <Radio value={opt.value}>{opt.label}</Radio>
                                ))}
                            </Radio.Group>
                        </FormItem>

                        <FormItem label="Esta ação custa dinheiro?">
                            <Radio name="action_cost_money"/>
                        </FormItem>

                        <FormItem label="Se sim, quanto por mês é gasto com esta ação">
                            <Field
                                type="number"
                                name="how_much_action_cost"
                                placeholder="Quanto custa esta ação por mês?"
                                component={Input}
                            />
                        </FormItem>

                        <FormItem label="Esta ação gera dinheiro?">
                            <Radio name="action_generate_money"/>
                        </FormItem>

                        <FormItem>
                            <Button type="submit">Submit</Button>
                        </FormItem>
                    </FormContainer>
                </Form>
            </Formik>
        </div>
    );
};

export default Layout;

