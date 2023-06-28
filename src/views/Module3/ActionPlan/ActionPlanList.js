import React, { useEffect, useState } from "react";
import { Button, Card, Input, Tooltip } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toastFeedback } from "../../../utils/actionFeedback";
import { delActionPlan } from "../../../store/module3/actionPlanSlice";
import { deleteActionPlan, putActionPlan } from "../../../services/Module3/ActionPlanService";
import { useDispatch } from "react-redux";
import { useActionPlanList } from "../../../hooks/useActionPlanList";


function ActionPlanList({ goalID }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const {action_plans, refreshActionPlanList} = useActionPlanList(goalID);
	
	useEffect(() => {
		refreshActionPlanList();
	}, [goalID])
	
	const handleDeleteItem = async (item) => {
		try {
			await deleteActionPlan(item.id).then(
				() => {
					dispatch(delActionPlan(item.id));
					toastFeedback("success", "Plano de Ação Deletado")
				}
			);
		} catch (e) {
			console.log(e);
			toastFeedback("danger", "Falha ao deletar");
		}
	};
	
	const handleConfigureItem = (item) => {
		navigate("/action-plan/form", { replace: true, state: { actionPlanItem: item } });
	};
	
	const ActionPlanItem = ({ item }) => {
		const [editing, setEditing] = useState(false);
		const [value, setValue] = useState(item.value);
		const handleEdit = () => {
			setEditing(true);
		};
		const handleSave = async () => {
			try {
				await putActionPlan(item.id, {value: value}).then(
					response => {
						console.log(response);
						if (response.status === 200) {
							toastFeedback("success", "Plano de Ação Atualizado!");
							setEditing(false);
						}
					}
				)
			} catch (e) {
				console.log(e);
				toastFeedback("danger", "Falha ao atualizar Plano de Ação!");
			}
		};
		
		const EditableCell = ({ id, value, setValue, isEditing }) => {
			const [inputValue, setInputValue] = useState(value);
			const [editing, setEditing] = useState(isEditing);
			const [className, setClassName] = useState("");
			
			useEffect(() => {
				setValue(value);
			}, [value]);
			
			useEffect(() => {
				if (editing) {
					setClassName("border-blue-500 focus:bg-white");
				} else {
					setClassName("border-transparent bg-transparent");
				}
			}, [editing]);
			
			return (
				<Input
					key={id}
					className={className}
					size="sm"
					value={inputValue}
					disabled={!editing}
					onChange={e => setInputValue(e.target.value)}
					onBlur={() => {setValue(inputValue)}}
				/>
			);
		};
		return (
			<div key={item.id}
			     className="flex flex-row items-center h-10 justify-between">
				<h6 className="mt-2">
					<EditableCell
						key={item.id}
						initialValue={item.value}
						isEditing={editing}
						value={value}
						setValue={setValue}
					/>
				</h6>
				
				<div className="flex flex-row gap-4 justify-center mt-2">
					{editing ? (
						<Button
							shape="circle"
							color="green-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineCheck />}
							onClick={handleSave}
						/>
					) : (
						<Tooltip title="Editar Nome">
							<Button
								shape="circle"
								color="blue-500"
								size="sm"
								variant="twoTone"
								icon={<AiOutlineEdit />}
								onClick={handleEdit}
							/>
						</Tooltip>
					)}
					<Tooltip title="Configurar Plano">
						<Button
							type="button"
							shape="circle"
							color="blue-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineSetting />}
							onClick={() => handleConfigureItem(item)}
						/>
					</Tooltip>
					
					<Button
						type="button"
						shape="circle"
						color="red-500"
						size="sm"
						variant="twoTone"
						icon={<MdDeleteForever />}
						onClick={() => handleDeleteItem(item)}
					/>
				</div>
			</div>
		);
	};
	
	return (
		<div>
			{action_plans.length >= 1 ? (
				<Card className="max-h-[400px] overflow-y-auto"
				      bodyClass="grid grid-cols-1 divide-y gap-2"
					// bodyClass="flex flex-col gap-4 divide-y"
				>
					{action_plans.map(
						item => (
							<ActionPlanItem key={item.id} item={item} />
						)
					)}
				</Card>
			) : null}
		</div>
	);
}

export default ActionPlanList;
