import React, { useState, useReducer, useRef, useCallback, useEffect } from "react";
import {
    Input,
    Button,
    Card,
    Switcher
} from "components/ui";
import LifeAspectSegment from "../components/LifeAspectSegment";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "store/userinfo/userInfoSlice";
import { fetchRoutinePayments, addNewPayment } from "store/userinfo/routinePaymentSlice";
import { postRoutinePayment } from "../../../services/PersonalService";

const RoutinePaymentForm = () => {
    const dispatch = useDispatch();
    const userInfoLoaded = useRef(false);
    const user_info = useSelector((state) => state.userinfo.userInfoState);
    const [user_info_id, setUserInfoID] = useState(null);
    const routine_payments = useSelector(state => state.userinfo.routinePaymentSlice);

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
            dispatch(fetchRoutinePayments());
        }
        console.log(routine_payments);
    }, [user_info, routine_payments]);

    const [lifeAspect, setLifeAspect] = useState([]);
    const [paymentGenerateMoney, setPaymentGenerateMoney] = useState(false);
    const [formData, setFormData] = useReducer(
        (state, newState) => ({ ...state, ...newState })
    );
    const handleLifeAspectChange = useCallback(
        val => {
            setLifeAspect(val);
        }, []
    );

    const onSwitcherToggle = (val) => {
        setPaymentGenerateMoney(!val);
    };
    const handleFormData = event => {
        const { name, value } = event.target;
        setFormData({ [name]: value });
    };

    const addNewRoutinePayment = (data) => {
        const update = async () => {
            try {
                const resp = await postRoutinePayment(data);
                if (resp.data) {
                    dispatch(addNewPayment(data));
                }
            } catch (errors) {
                console.log(errors);
            }
        };
        update();
    };

    const handleFormSubmit = () => {
        const data = {
            "user": user_info_id,
            "value": formData.routine_payment,
            "life_aspect": lifeAspect[0],
            "monthly_amount_investing": formData.payment_monthly_cost,
            "payment_generate_money": paymentGenerateMoney
        }
        addNewRoutinePayment(data);
    };
    return (
        <div>
            <div className="mb-8 grid justify-items-center">
                <h3>Cadastrar Pagamento de Rotina</h3>
            </div>

            <Card footer={
                <div className="flex justify-items-end">
                    <Button size="sm"
                            variant="solid"
                            onClick={handleFormSubmit}
                    >
                        Salvar
                    </Button>
                </div>}>

                <div className="flex flex-row items-center">
                    <p className="font-bold text-lg">Pagamento de Rotina: </p>
                    <Input className="max-w-sm ml-16"
                           placeholder="Nome do Pagamento de Rotina"
                           name="routine_payment"
                           onChange={handleFormData} />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">Aspecto de Vida Influenciado pelo Pagamento: </p>
                    <LifeAspectSegment onChange={handleLifeAspectChange} />
                </div>

                <div className="flex flex-row items-center mt-10">
                    <p className="font-bold text-lg">Qual o valor mensal investido neste pagamento? </p>
                    <Input className="max-w-sm ml-10"
                           name="payment_monthly_cost"
                           onChange={handleFormData}
                           type="number"
                           prefix="R$" />
                </div>

                <div className="flex flex-row items-center mt-10">
                    <p className="font-bold text-lg">Este pagamento / investimento gera dinheiro? </p>
                    <Switcher value={paymentGenerateMoney}
                              name="payment_generate_money"
                              color="green-500"
                              className="ml-10"
                              onChange={onSwitcherToggle}
                    />
                </div>

            </Card>

            <div>
                Pagamentos Registrados
                {!routine_payments.loading && routine_payments.routine_payments
                    ? routine_payments.routine_payments.map((item) =>
                            <div key={item.id}>
                                {item.value} - R${item.monthly_amount_investing}
                            </div>
                        )
                    : null
                }
            </div>
        </div>
    );
};

export default RoutinePaymentForm;