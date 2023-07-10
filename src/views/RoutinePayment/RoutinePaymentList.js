import React, { useEffect } from "react";
import { Button, Card, Table } from "../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchRoutinePayments,
	deletePayment
} from "../../store/userinfo/routinePaymentSlice";
import { RoutinePaymentDelete } from "../../services/RoutinePaymentService";
import { useNavigate } from "react-router-dom";
import store from "../../store";
import convertToReal from "../../utils/moneyWrapper";
import { getLifeAspectIconFromValue } from "../../constants/aspects.constant";
import { FaPlusSquare } from "react-icons/fa";

const { Tr, Td, THead, TBody } = Table;

const RoutinePaymentList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const routine_payments = useSelector(
		(state) => state.userinfo.routinePaymentSlice
	);

	useEffect(() => {
		const { auth } = store.getState();
		const user_info_id = auth.user.user_info_id;
		if (user_info_id) {
			dispatch(fetchRoutinePayments({ user_id: user_info_id }));
		}
	}, []);

	const delRoutinePayment = (id) => {
		const del = async () => {
			try {
				const resp = await RoutinePaymentDelete(id);
				if (resp.status === 204) {
					dispatch(deletePayment(id));
					alert("Sucesso");
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		del();
	};

	const handleEditPayment = (id) => {
		navigate("/routine/payment/form", {
			replace: true,
			state: { itemID: id }
		});
	};
	const ItemRow = ({ item }) => {
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td>{item.value}</Td>
				<Td>
					<div className="flex flex-row gap-4 items-center justify-center">
						{item.life_aspect.split(",").map(
							lifeAspect => (
								<span>
									{getLifeAspectIconFromValue(lifeAspect)}
								</span>
							)
						)}
					</div>
				</Td>
				<Td>{convertToReal(item.monthly_amount_investing)}</Td>
				<Td>{item.payment_generate_money ? "SIM" : "NÃO"}</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center">
						<Button
							shape="circle"
							color="blue-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineEdit />}
							onClick={() => {
								handleEditPayment(item.id);
							}}
						/>
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => delRoutinePayment(item.id)}
						/>
					</div>
				</Td>
			</Tr>
		);
	};

	const headerExtraContent = (
		<span className="flex items-center">
            <Button
	            icon={<FaPlusSquare />}
	            className="mr-2"
	            variant="twoTone"
	            onClick={() => {
		            navigate("/routine/payment/form");
	            }}
            >
                <span>Novo Pagamento</span>
            </Button>
        </span>
	);

	const TotalCost = () => {
		let total_income = 0;
		routine_payments.routine_payments.map(item => {
			total_income += item.monthly_amount_investing;
		});
		return (
			<Card className="mb-8">
				<div>
					<h6>Custo Total Dos Seus Pagamentos: {convertToReal(total_income)}</h6>
				</div>
			</Card>
		);
	};

	return (
		<Card
			header="Meus Pagamentos de Rotina"
			bodyClass="max-h-[700px] overflow-y-auto"
			headerClass="bg-[#FFBF29] rounded-t-lg"
			headerExtra={headerExtraContent}
		>
			{!routine_payments.loading && routine_payments.routine_payments && (
				<TotalCost />
			)}
			<Table>
				<THead style={{ textAlign: "center" }}>
					<Tr>
						<Td>
							<h6>Pagamento</h6>
						</Td>
						<Td>
							<h6>Aspectos de Vida</h6>
						</Td>
						<Td>
							<h6>Valor</h6>
						</Td>
						<Td>
							<h6>Gera Dinheiro?</h6>
						</Td>
						<Td>
							<h6>Ações</h6>
						</Td>
					</Tr>
				</THead>
				<TBody>
					{!routine_payments.loading &&
					routine_payments.routine_payments
						? routine_payments.routine_payments.map((item) => (
							<ItemRow item={item} />
						))
						: null}
				</TBody>
			</Table>
		</Card>
	);
};

export default RoutinePaymentList;
