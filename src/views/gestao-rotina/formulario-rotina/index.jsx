import React, { useState, useReducer, useCallback, useRef, useEffect } from "react";
import {
    Input,
    Button,
    Card
} from "components/ui";

import LifeAspectSegment from "../components/LifeAspectSegment";
import WeekdaySegment from "./components/WeekdaySegment";
import EnergyLevelSegment from "./components/EnergyLevelSegment";
import ActionMoneySegment from "./components/ActionMoneySegment";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../../store/userinfo/userInfoSlice";
import { fetchRoutineActions, addNewAction } from "store/userinfo/routineActionSlice";
import { postRoutineAction } from "../../../services/PersonalService";


const RoutineForm = () => {
    const dispatch = useDispatch();
    const userInfoLoaded = useRef(false);
    const user_info = useSelector((state) => state.userinfo.userInfoState);
    const routine_actions = useSelector(state => state.userinfo.routineActionSlice);
    const [user_info_id, setUserInfoID] = useState(null);

    useEffect(() => {
        if (!userInfoLoaded.current) {
            dispatch(fetchUserInfo());
        }
        if (!user_info.loading && user_info.currentUser) {
            setUserInfoID(user_info.currentUser.id);
            return () => {
                userInfoLoaded.current = true;
            };
        }
        if (userInfoLoaded.current) {
            dispatch(fetchRoutineActions());
        }
        console.log(routine_actions);
    }, [user_info, routine_actions]);

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

    const addNewRoutinePayment = (data) => {
        const update = async () => {
            try {
                const resp = await postRoutineAction(data);
                if (resp.data) {
                    dispatch(addNewAction(data));
                    alert("Sucesso");
                }
            } catch (errors) {
                console.log(errors);
            }
        };
        update();
    };

    const handleFormSubmit = () => {
        const action_generate_money = actionMoney.includes('1')
        const action_cost_money = actionMoney.includes('0')
        const action_cost = action_cost_money ? formData.action_cost : 0

        const data = {
            "user": user_info_id,
            "value": formData.routine_action,
            "life_aspect": lifeAspect.toString(),
            "time_spent": formData.time_spent,
            "days_of_week": weekDay.toString(),
            "energy_spent": energyLevel.toString(),
            "action_cost": action_cost,
            "action_generate_money": action_generate_money,
            "action_cost_money": action_cost_money
        }
        console.log(data);
        addNewRoutinePayment(data);
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
                           name="time_spent"
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
                    {actionMoney.includes('0') ? (
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-lg">Quanto por mês é gasto com esta ação? </p>
                            <Input className="max-w-sm"
                                   name="action_cost"
                                   onChange={handleFormData}
                                   type="number"
                                   prefix="R$" />
                        </div>
                    ) : null}
                </div>
            </Card>

        </div>
    );
};

export default RoutineForm;

