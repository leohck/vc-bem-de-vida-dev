import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { useActionList } from "../../../hooks/useActionList";
import {delAction} from "../../../store/module3/actionSlice";

function ActionList({ actionPlanID }) {
	const [estimatedDeadline, setEstimatedDeadline] = useState();
	const { actions } = useActionList(actionPlanID);
	const [actionList, setActionList] = useState(actions);
	
	useEffect(() => {
		setActionList(actions)
	}, [actions])
	const handleDeleteItem = (item) => {
		delAction(item.id)
		setActionList(actionList.filter(
			(el) => el.id !== item.id
		))
	};
	
	const handleConfigureItem = () => {
	
	};
	
	const handleSaveItem = () => {
	
	};
	
	const ActionPlanItem = ({ item }) => {
		return (
			<div key={item.id}
			     className="flex flex-row items-center h-10 justify-between">
				<h6 className="mt-2">
					{item.value}
				</h6>
				<Input
					type="date"
					name="estimated_deadline"
					className="w-[165px]"
					value={estimatedDeadline}
					onChange={(e) => setEstimatedDeadline(e.target.value)}
				/>
				
				<div className="flex flex-row gap-4 justify-center mt-2">
					<Button
						shape="circle"
						color="green-500"
						size="sm"
						variant="twoTone"
						icon={<AiOutlineCheck />}
						onClick={handleSaveItem}
					/>
					
					<Button
						type="button"
						shape="circle"
						color="blue-500"
						size="sm"
						variant="twoTone"
						icon={<AiOutlineSetting />}
						onClick={() => handleConfigureItem(item)}
					/>
					
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
		<div className="flex flex-col gap-2">
			<h6>Ações do Plano</h6>
			<Card className="max-h-[400px] h-[200px] overflow-y-auto"
			      bodyClass="grid grid-cols-1 divide-y gap-2"
				// bodyClass="flex flex-col gap-4 divide-y"
			>
				{actionList.map(
					item => (
						<ActionPlanItem key={item.id} item={item} />
					)
				)}
			</Card>
		</div>
	);
}

export default ActionList;
