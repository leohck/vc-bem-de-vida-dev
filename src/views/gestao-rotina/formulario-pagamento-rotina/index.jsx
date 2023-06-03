import React, {useState, useReducer, useCallback} from "react";
import {
    Input,
    Button,
    Card,
    Switcher
} from "components/ui";
import LifeAspectSegment from "../components/LifeAspectSegment";

const RoutinePaymentForm = () => {
    const [lifeAspect, setLifeAspect] = useState([]);
    const [paymentGenerateMoney, setPaymentGenerateMoney] = useState(false)
    const [formData, setFormData] = useReducer(
        (state, newState) => ({ ...state, ...newState })
    );
    const handleLifeAspectChange = useCallback(
        val => {
            setLifeAspect(val);
        }, []
    );

    const onSwitcherToggle = (val) => {
        setPaymentGenerateMoney(!val)
    }
    const handleFormData = event => {
        const { name, value } = event.target;
        setFormData({ [name]: value });
    };

    const handleFormSubmit = () => {
        console.log(formData);
        console.log(lifeAspect);
        console.log(paymentGenerateMoney);
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
        </div>
    )
}

export default RoutinePaymentForm;