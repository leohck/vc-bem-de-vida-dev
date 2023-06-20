import React, {
    useState,
    useCallback,
    useEffect,
} from 'react'
import { Input, Button, Card } from 'components/ui'

import LifeAspectSegment from '../gestao-rotina/components/LifeAspectSegment'
import WeekdaySegment from './components/WeekdaySegment'
import EnergyLevelSegment from './components/EnergyLevelSegment'
import ActionMoneySegment from './components/ActionMoneySegment'
import { useDispatch } from 'react-redux'
import { addNewAction } from 'store/userinfo/routineActionSlice'
import { getRoutineAction, getWeeklyHoursSpent, postRoutineAction } from "../../services/RoutineActionService";
import { useLocation, useNavigate } from 'react-router-dom'
import store from "../../store";

const RoutineForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user_info_id, setUserInfoID] = useState(null)
    const [itemID, setItemID] = useState(null)
    const { state } = useLocation()

    const [lifeAspect, setLifeAspect] = useState([])
    const [weekDay, setWeekDay] = useState([])
    const [energyLevel, setEnergyLevel] = useState([])
    const [actionMoney, setActionMoney] = useState([])
    const [actionValue, setActionValue] = useState()
    const [timeSpent, setTimeSpent] = useState()
    const [actionCost, setActionCost] = useState()
    const [weeklyHoursSpentCount, setWeeklyHoursSpentCount] = useState([
        0, 0, 0, 0, 0, 0, 0,
    ])

    useEffect(() => {
        const { auth } = store.getState();
        const user_id = auth.user.user_info_id;
        setUserInfoID(user_id);
    }, [])

    useEffect(() => {
        try {
            const { itemID } = state
            setItemID(itemID)
        } catch (e) {
            setItemID(null)
        }
    }, [state])

    useEffect(() => {
        const get_ra = async () => {
            if (itemID) {
                await getRoutineAction(itemID).then(
                    response => {
                        const action_money = []
                        if (response.data.action_generate_money) {
                            action_money.push('1')
                        }
                        if (response.data.action_cost_money) {
                            action_money.push('0')
                        }
                        setActionValue(response.data.value)
                        setTimeSpent(response.data.time_spent)
                        setLifeAspect(response.data.life_aspect.split(','))
                        setWeekDay(response.data.days_of_week.split(','))
                        setEnergyLevel([response.data.energy_spent.toString()])
                        setActionMoney(action_money)
                        setActionCost(response.data.action_cost)
                    }
                )
            }
        }
        get_ra()
    }, [itemID])

    useEffect(() => {
        const get_wh = async () => {
            try {
                await getWeeklyHoursSpent(user_info_id).then(
                    response => {
                        setWeeklyHoursSpentCount(response.data.weekly_hours_spent)
                    }
                )
            } catch (e) {
                console.log(e);
            }
        }
        get_wh()
    }, [user_info_id])

    const handleLifeAspectChange = useCallback((val) => {
        setLifeAspect(val)
    }, [])

    const handleWeekDayChange = useCallback((val) => {
        setWeekDay(val)
    }, [])

    const handleEnergyLevelChange = useCallback((val) => {
        setEnergyLevel(val)
    }, [])

    const handleActionMoneyChange = useCallback((val) => {
        setActionMoney(val)
    }, [])

    const addNewRoutinePayment = (data) => {
        const update = async () => {
            try {
                const resp = await postRoutineAction(data, itemID)
                if (resp.data) {
                    dispatch(addNewAction(data))
                    alert('Sucesso')
                    navigate('/routine/actions', { replace: true })
                }
            } catch (errors) {
                console.log(errors)
            }
        }
        update()
    }

    const handleFormSubmit = () => {
        const action_generate_money = actionMoney.includes('1')
        const action_cost_money = actionMoney.includes('0')
        const action_cost = action_cost_money ? actionCost : 0

        const data = {
            user: user_info_id,
            value: actionValue,
            life_aspect: lifeAspect.toString(),
            time_spent: timeSpent,
            days_of_week: weekDay.toString(),
            energy_spent: energyLevel.toString(),
            action_cost: action_cost,
            action_generate_money: action_generate_money,
            action_cost_money: action_cost_money,
        }
        addNewRoutinePayment(data)
    }

    return (
        <div>
            <div className="mb-8 grid justify-items-center">
                <h3>Cadastrar Ação de Rotina</h3>
            </div>

            <Card
                footer={
                    <div className="flex justify-items-end">
                        <Button
                            size="sm"
                            variant="solid"
                            onClick={handleFormSubmit}
                        >
                            Salvar
                        </Button>
                    </div>
                }
            >
                <div className="flex flex-row items-center">
                    <p className="font-bold text-lg">Ação de Rotina: </p>
                    <Input
                        className="max-w-sm ml-16"
                        placeholder="Nome da Ação de Rotina"
                        name="routine_action"
                        value={actionValue}
                        onChange={(e) => {
                            setActionValue(e.target.value)
                        }}
                    />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">
                        Aspecto de Vida Influenciado pela Ação:{' '}
                    </p>
                    <LifeAspectSegment
                        value={lifeAspect}
                        onChange={handleLifeAspectChange}
                    />
                </div>

                <div className="flex flex-row items-center mt-10">
                    <p className="font-bold text-lg">
                        Quantas horas / dia são necessárias para esta ação:{' '}
                    </p>
                    <Input
                        className="max-w-sm ml-16"
                        name="time_spent"
                        value={timeSpent}
                        onChange={(e) => {
                            setTimeSpent(e.target.value)
                        }}
                        type="number"
                        step={0.5}
                        min={1}
                        max={24}
                        placeholder="Quantas horas são necessárias"
                    />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">
                        Em quais dias da semana esta ação é executada?{' '}
                    </p>
                    <WeekdaySegment
                        value={weekDay}
                        onChange={handleWeekDayChange}
                        weeklyHoursSpentCount={weeklyHoursSpentCount}
                    />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">
                        Considerando a escala abaixo, como você classifica o
                        nível de energia (esforço/atenção) despendido nesta
                        ação?{' '}
                    </p>
                    <EnergyLevelSegment
                        value={energyLevel}
                        onChange={handleEnergyLevelChange}
                    />
                </div>

                <div className="flex flex-row items-center gap-[200px] mt-10">
                    <div className="flex flex-col">
                        <p className="font-bold text-lg">Esta Ação?</p>
                        <ActionMoneySegment
                            value={actionMoney}
                            onChange={handleActionMoneyChange}
                        />
                    </div>
                    {actionMoney.includes('0') ? (
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-lg">
                                Quanto por mês é gasto com esta ação?{' '}
                            </p>
                            <Input
                                className="max-w-sm"
                                name="action_cost"
                                value={actionCost}
                                onChange={(e) => {
                                    setActionCost(e.target.value)
                                }}
                                type="number"
                                prefix="R$"
                            />
                        </div>
                    ) : null}
                </div>
            </Card>
        </div>
    )
}

export default RoutineForm