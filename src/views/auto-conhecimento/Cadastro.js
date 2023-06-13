import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Button, Card, DatePicker, Input, Segment } from 'components/ui'
import { HiOutlineUser } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '../../store/userinfo/userInfoSlice'
import { putUserInfo } from '../../services/PersonalService'
import { setCurrentUser } from '../../store/userinfo/userInfoSlice'

const Cadastro = () => {
    const dispatch = useDispatch()
    const userInfoLoaded = useRef(false)
    const user_info = useSelector((state) => state.userinfo.userInfoState)
    const [user_info_id, setUserInfoID] = useState(null)
    const [maritalStatus, setMaritalStatus] = useState([])
    const [age, setAge] = useState()
    const [name, setName] = useState()

    useEffect(() => {
        if (!userInfoLoaded.current) {
            dispatch(fetchUserInfo())
        }
        if (!user_info.loading && user_info.currentUser) {
            setUserInfoID(user_info.currentUser.id)
            setName(user_info.currentUser.name)
            setAge(user_info.currentUser.age)
            setMaritalStatus([user_info.currentUser.marital_status])

            return () => {
                userInfoLoaded.current = true
            }
        }
    }, [user_info])

    const saveUserInfo = (data) => {
        const update = async () => {
            try {
                const resp = await putUserInfo(user_info_id, data)
                if (resp.data) {
                    dispatch(setCurrentUser(data))
                }
            } catch (errors) {
                console.log(errors)
            }
        }
        update()
    }

    const handleFormSubmit = () => {
        const data = {
            id: user_info_id,
            name: name,
            age: age,
            marital_status: maritalStatus[0],
        }
        saveUserInfo(data)
    }

    const handleMaritalStatusChange = useCallback((val) => {
        setMaritalStatus(val)
    }, [])

    return (
        <div>
            <div className="mb-8 grid justify-items-center">
                <h2>Cadastro Inicial</h2>
            </div>

            <Card
                bodyClass="flex flex-col gap-4"
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
                    <p className="font-bold text-lg">Nome: </p>
                    <Input
                        className="max-w-sm ml-16"
                        name="name"
                        value={name}
                        prefix={<HiOutlineUser className="text-lg" />}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className="flex flex-row items-center max-w-[200px]">
                    <p className="font-bold text-lg">Idade: </p>
                    <Input
                        className="max-w-sm ml-16"
                        name="age"
                        type="number"
                        value={age}
                        onChange={(e) => {
                            setAge(e.target.value)
                        }}
                    />
                </div>

                <div className="max-w-[200px]">
                    <DatePicker
                        inputtable
                        locale="ko"
                        inputFormat="DD/MMMM/YYYY"
                        placeholder="Data de Nascimento"
                    />
                </div>

                <div className="flex flex-col justify-items-center">
                    <p className="font-bold text-lg">Estado Civil</p>
                    <Segment
                        onChange={handleMaritalStatusChange}
                        value={maritalStatus}
                    >
                        <Segment.Item value="Solteiro">Solteiro</Segment.Item>
                        <Segment.Item value="Uniao Estavel">
                            União Estável
                        </Segment.Item>
                        <Segment.Item value="Casado">Casado</Segment.Item>
                        <Segment.Item value="Viuvo">Viuvo</Segment.Item>
                    </Segment>
                </div>
            </Card>
        </div>
    )
}

export default Cadastro
