import React, { useEffect, useRef } from "react";
import { Button, Card, Table } from "../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutinePayments } from "../../store/userinfo/routinePaymentSlice";

const { Tr, Td, THead, TBody } = Table;


const RoutinePaymentList = () => {
    const dispatch = useDispatch();
    const routine_payments_loaded = useRef(false);
    const routine_payments = useSelector(
        state => state.userinfo.routinePaymentSlice
    );

    useEffect(() => {
        if (!routine_payments_loaded.current) {
            dispatch(fetchRoutinePayments());
            routine_payments_loaded.current = true;
        }
    }, []);
    
    const ItemRow = ({ item }) => {
        return (
            <Tr key={item.id} style={{ textAlign: "center" }}>
                <Td>{item.value}</Td>
                <Td>R${item.monthly_amount_investing}</Td>
                <Td>{item.payment_generate_money ? "SIM" : "NÃO"}</Td>
                <Td>
                    <div className="flex flex-row justify-evenly">
                        <Button
                            shape="circle"
                            color="red-500"
                            size="sm"
                            variant="twoTone"
                            icon={<MdDeleteForever />}
                            // onClick={() => delSourceIncome(item.id)}
                        />

                        <Button
                            shape="circle"
                            color="blue-500"
                            size="sm"
                            variant="twoTone"
                            icon={<AiOutlineEdit />}
                            // onClick={() => {setItemID(item.id)}}
                        />
                    </div>
                </Td>
            </Tr>
        );
    };

    return (
        <Card header="Meus Pagamentos de Rotina">
            <Table>
                <THead style={{ textAlign: "center" }}>
                    <Tr>
                        <Td><h6>Pagamento</h6></Td>
                        <Td><h6>Valor</h6></Td>
                        <Td><h6>Gera Dinheiro?</h6></Td>
                        <Td><h6>Ações</h6></Td>
                    </Tr>
                </THead>
                <TBody>
                    {!routine_payments.loading && routine_payments.routine_payments
                        ? routine_payments.routine_payments.map((item) =>
                            <ItemRow item={item} />
                        )
                        : null
                    }
                </TBody>
            </Table>
        </Card>
    );
};

export default RoutinePaymentList;