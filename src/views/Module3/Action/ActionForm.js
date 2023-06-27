import React, { useState } from "react";
import { Button, Input } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputLabel } from "../../../components/new";

function ActionForm({ actionList, setActionList }) {
	const [action, setAction] = useState();

	const handleAddItem = () => {
		if (action) {
			setActionList([
				...actionList,
				{
					id: Math.floor(Math.random() * 100),
					value: action
				}
			]);
			setAction(null)
		}
	};

	return (
		<div className="flex flex-row items-center gap-4">
			<InputLabel label="Nova Ação">
				<Input
					className="w-[400px]"
					type="text"
					name="action"
					placeholder="Ação"
					onChange={(e) => setAction(e.target.value)} />
			</InputLabel>
			<Button
				className="mt-5"
				type="button"
				shape="circle"
				color="blue-500"
				size="sm"
				variant="twoTone"
				icon={<AiOutlinePlusCircle />}
				onClick={() => handleAddItem()}
			/>
		</div>
	);
}

export default ActionForm;
