import React, { useEffect, useState } from "react";
import { Button, Card, Table, Select, Tooltip } from "../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
	deleteAction
} from "../../store/userinfo/routineActionSlice";
import { RoutineActionDelete } from "../../services/RoutineActionService";
import { useNavigate } from "react-router-dom";
import convertToReal from "../../utils/moneyWrapper";
import { FaPlusSquare } from "react-icons/fa";
import { toastFeedback } from "../../utils/actionFeedback";
import { useRoutineActionList } from "../../hooks/useRoutineActionList";
import { lifeAspectOptions } from "../auto-conhecimento/form.options";
import { GrFormRefresh } from "react-icons/gr";
import useResponsive from "../../utils/hooks/useResponsive";

const { Tr, Td, THead, TBody } = Table;

const RoutineActionList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const { routine_actions_no_action_plan } = useRoutineActionList();
	const [routineActionList, setRoutineActionList] = useState(routine_actions_no_action_plan);
	const [lifeAspect, setLifeAspect] = useState(null);
	const { windowWidth } = useResponsive();
	useEffect(() => {
		if (routineActionList.length <= 0) {
			setRoutineActionList(routine_actions_no_action_plan);
		}
	}, [routine_actions_no_action_plan]);
	
	const delRoutineAction = async (id) => {
		try {
			const resp = await RoutineActionDelete(id);
			if (resp.status === 204) {
				dispatch(deleteAction(id));
				toastFeedback("warning", "Ação de Rotina Excluida");
				window.location.reload();
			}
		} catch (errors) {
			console.log(errors);
		}
	};
	
	const handleEditAction = (id) => {
		navigate("/routine/action/form", { state: { itemID: id, isNew: false } });
	};
	
	const ItemRow = ({ item }) => {
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td>{item.value}</Td>
				<Td>{item.time_spent}</Td>
				<Td>{item.energy_spent}</Td>
				<Td>{convertToReal(item.action_cost)}</Td>
				<Td>{item.read_status}</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center">
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
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => delRoutineAction(item.id)}
						/>
					</div>
				</Td>
			</Tr>
		);
	};
	
	const TotalCost = () => {
		let total_income = 0;
		routineActionList.map(item => {
			total_income += item.action_cost;
		});
		return (
			<h6>Custo Total Das Suas Ações: {convertToReal(total_income)}</h6>
		);
	};
	
	const onChangeLifeAspect = (e) => {
		if (e.value) {
			setLifeAspect(e);
			setRoutineActionList(
				routine_actions_no_action_plan.filter(item => item.life_aspect.includes(e.value))
			);
		} else {
			setRoutineActionList(routine_actions_no_action_plan);
		}
	};
	const cleanForm = () => {
		setLifeAspect(null);
		setRoutineActionList(routine_actions_no_action_plan);
	};
	
	const headerExtraContent = (
		<span className="flex items-center">
            <Button
	            icon={<FaPlusSquare />}
	            className="mr-2"
	            variant="twoTone"
	            onClick={() => {
		            navigate("/routine/action/form");
	            }}
            >
                {windowWidth > 640 && <span>Nova Ação</span>}
            </Button>
        </span>
	);
	
	return (
		<Card
			bodyClass="min-h-[300px] max-h-[700px] overflow-y-auto"
			header="Minhas Ações"
			headerClass="bg-[#FFBF29] rounded-t-lg"
			headerExtra={headerExtraContent}>
			<Card className="mb-8"
			      bodyClass="grid grid-cols-1 items-center gap-y-5 md:grid-cols-2">
				{routineActionList && (<TotalCost />)}
				{routineActionList && (
					<div className="flex flex-row items-center gap-2 md:justify-self-end">
						<Select
							placeholder="Aspecto de Vida"
							className="max-w-[400px]"
							isSearchable={false}
							options={lifeAspectOptions}
							value={lifeAspect}
							onChange={(e) => onChangeLifeAspect(e)}
						/>
						<Tooltip title="Limpar Filtro">
							<Button
								shape="circle"
								color="blue-500"
								size="sm"
								variant="twoTone"
								icon={<GrFormRefresh />}
								onClick={() => {
									cleanForm();
								}}
							/>
						</Tooltip>
					</div>
				)}
			</Card>
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
					{routineActionList && routineActionList.map((item) => (
						<ItemRow item={item} key={item.id} />
					))}
				</TBody>
			</Table>
		</Card>
	);
};

export default RoutineActionList;
