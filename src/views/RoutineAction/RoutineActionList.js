import React, { useEffect, useRef } from "react";
import { Button, Card, Table } from "../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchRoutineActions,
	deleteAction
} from "../../store/userinfo/routineActionSlice";
import { RoutineActionDelete } from "../../services/RoutineActionService";
import { useNavigate } from "react-router-dom";
import store from "../../store";
import convertToReal from "../../utils/moneyWrapper";

const { Tr, Td, THead, TBody } = Table;

const RoutineActionList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const routine_actions = useSelector(
		state => state.userinfo.routineActionSlice
	);

	useEffect(() => {
		const { auth } = store.getState();
		const user_id = auth.user.user_info_id;
		dispatch(fetchRoutineActions({ user_id: user_id }));
	}, []);

	const delRoutineAction = (id) => {
		const del = async () => {
			try {
				const resp = await RoutineActionDelete(id);
				if (resp.status === 204) {
					dispatch(deleteAction(id));
					alert("Sucesso");
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		del();
	};

	const handleEditAction = (id) => {
		navigate("/routine/action/form", { replace: true, state: { itemID: id, isNew: false} });
	};

	const ItemRow = ({ item }) => {
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td>{item.value}</Td>
				<Td>{item.time_spent}</Td>
				<Td>{item.energy_spent}</Td>
				<Td>{convertToReal(item.action_cost)}</Td>
				<Td>{item.status}</Td>
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
								handleEditAction(item.id);
							}}
						/>
					</div>
				</Td>
			</Tr>
		);
	};

	const TotalCost = () => {
		let total_income = 0;
		routine_actions.routine_actions.map(item => {
			total_income += item.action_cost
		})
		return (
			<Card className="mb-8">
				<div>
					<h6>Custo Total Das Suas Ações: {convertToReal(total_income)}</h6>
				</div>
			</Card>
		)
	}

	const headerExtraContent = (
		<span className="flex items-center">
            <Button
	            className="mr-2"
	            variant="twoTone"
	            onClick={() => {
		            navigate("/routine/action/form", { replace: true });
	            }}
            >
                <span>Nova Ação</span>
            </Button>
        </span>
	);

	return (
		<Card header="Minhas Ações" headerExtra={headerExtraContent}>
			{!routine_actions.loading && routine_actions.routine_actions && (
				<TotalCost />
			)}
			<Table>
				<THead style={{ textAlign: "center" }}>
					<Tr>
						<Td>
							<h6>Ação</h6>
						</Td>
						<Td>
							<h6>Tempo Consumido</h6>
						</Td>
						<Td>
							<h6>Energia Consumida</h6>
						</Td>
						<Td>
							<h6>Custo Financeiro</h6>
						</Td>
						<Td>
							<h6>Status</h6>
						</Td>
						<Td>
							<h6>Ações</h6>
						</Td>
					</Tr>
				</THead>
				<TBody>
					{!routine_actions.loading && routine_actions.routine_actions
						? routine_actions.routine_actions.map((item) => (
							<ItemRow item={item} key={item.id}/>
						))
						: null}
				</TBody>
			</Table>
		</Card>
	);
};

export default RoutineActionList;
