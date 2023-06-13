import React, { useEffect, useRef } from 'react'
import { Button, Card, Table } from '../../components/ui'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchRoutineActions,
    deleteAction,
} from '../../store/userinfo/routineActionSlice'
import { RoutineActionDelete } from '../../services/PersonalService'
import { useNavigate } from 'react-router-dom'

const { Tr, Td, THead, TBody } = Table

const RoutineActionList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const routine_actions_loaded = useRef(false)
    const routine_actions = useSelector(
        (state) => state.userinfo.routineActionSlice
    )

    useEffect(() => {
        if (!routine_actions_loaded.current) {
            dispatch(fetchRoutineActions())
            routine_actions_loaded.current = true
        }
    }, [])

    const delRoutineAction = (id) => {
        const del = async () => {
            try {
                const resp = await RoutineActionDelete(id)
                if (resp.status === 204) {
                    dispatch(deleteAction(id))
                    alert('Sucesso')
                }
            } catch (errors) {
                console.log(errors)
            }
        }
        del()
    }

    const handleEditAction = (id) => {
        navigate('/formulario/rotina', { replace: true, state: { itemID: id } })
    }

    const ItemRow = ({ item }) => {
        return (
            <Tr key={item.id} style={{ textAlign: 'center' }}>
                <Td>{item.value}</Td>
                {/*<Td>{item.life_aspect}</Td>*/}
                {/*<Td>{item.days_of_week}</Td>*/}
                <Td>{item.time_spent}</Td>
                <Td>{item.energy_spent}</Td>
                {/*<Td>{item.action_generate_money ? "SIM" : "NÃO"}</Td>*/}
                {/*<Td>{item.action_cost_money ? "SIM" : "NÃO"}</Td>*/}
                <Td>R${item.action_cost}</Td>
                <Td>
                    <div className="flex flex-row gap-4 justify-center">
                        <Button
                            shape="circle"
                            color="red-500"
                            size="sm"
                            variant="twoTone"
                            icon={<MdDeleteForever />}
                            onClick={() => delRoutineAction(item.id)}
                        />

                        <Button
                            shape="circle"
                            color="blue-500"
                            size="sm"
                            variant="twoTone"
                            icon={<AiOutlineEdit />}
                            onClick={() => {
                                handleEditAction(item.id)
                            }}
                        />
                    </div>
                </Td>
            </Tr>
        )
    }

    const headerExtraContent = (
        <span className="flex items-center">
            <Button
                className="mr-2"
                variant="twoTone"
                onClick={() => {
                    navigate('/formulario/rotina', { replace: true })
                }}
            >
                <span>Nova Ação</span>
            </Button>
        </span>
    )

    return (
        <Card header="Minhas Ações de Rotina" headerExtra={headerExtraContent}>
            <Table>
                <THead style={{ textAlign: 'center' }}>
                    <Tr>
                        <Td>
                            <h6>Ação</h6>
                        </Td>
                        {/*<Td><h6>Aspectos de vida</h6></Td>*/}
                        {/*<Td><h6>Dias da Semana</h6></Td>*/}
                        <Td>
                            <h6>Tempo Consumido</h6>
                        </Td>
                        <Td>
                            <h6>Energia Consumida</h6>
                        </Td>
                        {/*<Td><h6>Gera Dinheiro?</h6></Td>*/}
                        {/*<Td><h6>Custa Dinheiro?</h6></Td>*/}
                        <Td>
                            <h6>Custo Financeiro</h6>
                        </Td>
                        <Td>
                            <h6>Ações</h6>
                        </Td>
                    </Tr>
                </THead>
                <TBody>
                    {!routine_actions.loading && routine_actions.routine_actions
                        ? routine_actions.routine_actions.map((item) => (
                              <ItemRow item={item} />
                          ))
                        : null}
                </TBody>
            </Table>
        </Card>
    )
}

export default RoutineActionList
