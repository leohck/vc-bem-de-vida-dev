import React, { useEffect, useRef } from "react";
import { Button, Card, Table } from "../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { deleteSourceIncome, fetchSourceIncomes } from "../../store/userinfo/sourceIncomeSlice";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { SourceIncomeDelete } from "../../services/PersonalService";

const { Tr, Td, THead, TBody } = Table;

const SourceIncomeList = (props) => {
    const {
        user_info_id,
        setItemID
    } = props;

    const dispatch = useDispatch();
    const source_incomes_loaded = useRef(false);
    const source_incomes = useSelector(
        state => state.userinfo.sourceIncomeSlice
    );

    useEffect(() => {
        if (!source_incomes_loaded.current) {
            dispatch(fetchSourceIncomes());
            source_incomes_loaded.current = true;
        }
    }, []);

    const delSourceIncome = (id) => {
        const del = async () => {
            try {
                const resp = await SourceIncomeDelete(id);
                if (resp.status === 204) {
                    dispatch(deleteSourceIncome(id));
                    alert("Sucesso");
                }
            } catch (errors) {
                console.log(errors);
            }
        }
        del();
    }


    const ItemRow = ({ item }) => {
        return (
            <Tr key={item.id} style={{ textAlign: "center" }}>
                <Td>{item.income_from}</Td>
                <Td>{item.income_type}</Td>
                <Td>R${item.income}</Td>
                <Td>
                    <div className="flex flex-row justify-evenly">
                        <Button
                            shape="circle"
                            color="red-500"
                            size="sm"
                            variant="twoTone"
                            icon={<MdDeleteForever />}
                            onClick={() => delSourceIncome(item.id)}
                        />

                        <Button
                            shape="circle"
                            color="blue-500"
                            size="sm"
                            variant="twoTone"
                            icon={<AiOutlineEdit />}
                            onClick={() => {setItemID(item.id)}}
                        />
                    </div>
                </Td>
            </Tr>
        );
    };

    return (
        <Card header="Minhas Fontes de Renda">
            <Table>
                <THead style={{ textAlign: "center" }}>
                    <Tr>
                        <Td><h6>Tipo de Renda</h6></Td>
                        <Td><h6>Classificação</h6></Td>
                        <Td><h6>Valor</h6></Td>
                        <Td><h6>Ações</h6></Td>
                    </Tr>
                </THead>
                <TBody>
                    {!source_incomes.loading && source_incomes.source_incomes
                        ? source_incomes.source_incomes.map((item) =>
                            <ItemRow item={item} />
                        )
                        : null
                    }
                </TBody>
            </Table>
        </Card>
    );
};

export default SourceIncomeList;