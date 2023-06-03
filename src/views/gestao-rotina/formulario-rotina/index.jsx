import React, { useState, useReducer, useCallback } from "react";
import {
    Input,
    Button,
    Card
} from "components/ui";

import LifeAspectSegment from "../components/LifeAspectSegment";
import WeekdaySegment from "./components/WeekdaySegment";
import EnergyLevelSegment from "./components/EnergyLevelSegment";
import ActionMoneySegment from "./components/ActionMoneySegment";
import WeeklyRoutineChart from "../components/WeeklyRoutineChart";

const RoutineForm = () => {
    const [lifeAspect, setLifeAspect] = useState([]);
    const [weekDay, setWeekDay] = useState([]);
    const [energyLevel, setEnergyLevel] = useState([]);
    const [actionMoney, setActionMoney] = useState([]);
    const [formData, setFormData] = useReducer(
        (state, newState) => ({ ...state, ...newState })
    );
    const handleLifeAspectChange = useCallback(
        val => {
            setLifeAspect(val);
        }, []
    );

    const handleWeekDayChange = useCallback(
        val => {
            setWeekDay(val);
        },[]
    );

    const handleEnergyLevelChange = useCallback(
        val => {
            setEnergyLevel(val);
        }, []
    );

    const handleActionMoneyChange = useCallback(
        val => {
            setActionMoney(val);
        }, []
    );

    const handleFormData = event => {
        const { name, value } = event.target;
        setFormData({ [name]: value });
    };

    const handleFormSubmit = () => {
        console.log(formData);
        console.log(lifeAspect);
        console.log(weekDay);
        console.log(energyLevel);
        console.log(actionMoney);
    };

    return (
        <div>
            <div className="mb-8 grid justify-items-center">
                <h3>Cadastrar Ação de Rotina</h3>
            </div>

            <Card
                footer={
                    <div className="flex justify-items-end">
                        <Button size="sm"
                                variant="solid"
                                onClick={handleFormSubmit}
                        >
                            Salvar
                        </Button>
                    </div>}>

                <div className="flex flex-row items-center">
                    <p className="font-bold text-lg">Ação de Rotina: </p>
                    <Input className="max-w-sm ml-16"
                           placeholder="Nome da Ação de Rotina"
                           name="routine_action"
                           onChange={handleFormData} />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">Aspecto de Vida Influenciado pela Ação: </p>
                    <LifeAspectSegment onChange={handleLifeAspectChange} />
                </div>

                <div className="flex flex-row items-center mt-10">
                    <p className="font-bold text-lg">Quantas horas / dia são necessárias para esta ação: </p>
                    <Input className="max-w-sm ml-16"
                           name="hours_per_day"
                           onChange={handleFormData}
                           type="number"
                           step={0.5}
                           min={1}
                           max={24}
                           placeholder="Quantas horas são necessárias" />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">Em quais dias da semana esta ação é executada? </p>
                    <WeekdaySegment onChange={handleWeekDayChange} />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">Considerando a escala abaixo, como você classifica o nível de
                        energia (esforço/atenção) despendido nesta ação? </p>
                    <EnergyLevelSegment onChange={handleEnergyLevelChange} />
                </div>

                <div className="flex flex-row items-center gap-[200px] mt-10">
                    <div className="flex flex-col">
                        <p className="font-bold text-lg">Esta Ação?</p>
                        <ActionMoneySegment onChange={handleActionMoneyChange} />
                    </div>
                    {actionMoney[0] === "0" ? (
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-lg">Quanto por mês é gasto com esta ação? </p>
                            <Input className="max-w-sm"
                                   name="how_much_action_cost"
                                   onChange={handleFormData}
                                   type="number"
                                   prefix="R$" />
                        </div>
                    ) : null}
                </div>

                <WeeklyRoutineChart />

            </Card>

        </div>
    );
};

export default RoutineForm;

