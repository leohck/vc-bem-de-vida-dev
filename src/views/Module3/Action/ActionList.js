import React, { useState } from "react";
import { Button, Card, Input } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

function ActionList({ actionList, setActionList }) {
	const [estimatedDeadline, setEstimatedDeadline] = useState();

	const handleDeleteItem = (item) => {
		setActionList(actionList.filter(
			(el) => el.id !== item.id
		));
	};

	const handleConfigureItem = () => {

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
