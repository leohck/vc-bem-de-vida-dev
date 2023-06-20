import React from "react";
import { Button, Card } from "components/ui";
import DialogForm from "../Skills/DialogForm";
import DialogList from "../Skills/DialogList";
import { FaPlusSquare } from "react-icons/fa";

const CardWithDialog = (props) => {
	const {
		title,
		itemCount,
	} = props;

	return (
		<div>
			<Card
				header={title}
				headerClass="flex items-center justify-center"
				// className="w-64 h-40 shadow-md shadow-yellow-400/50"
				className="w-64 h-40 shadow-md shadow-blue-900/50"
			>
				<div className="flex items-center justify-center">
					<h1>{itemCount}</h1>
				</div>
				{/*</div>*/}
				{/*<div className="flex flex-col gap-2 w-10 max-w-10 justify-items-end justify-self-end">*/}
				{/*	<DialogList*/}
				{/*		itemType={itemType}*/}
				{/*		itemList={itemList}*/}
				{/*		setItemList={setItemList}*/}
				{/*	/>*/}
				{/*	<Button*/}
				{/*		shape="circle"*/}
				{/*		size="xs"*/}
				{/*		variant="twoTone"*/}
				{/*		icon={<FaPlusSquare />}*/}
				{/*		onClick={() => handleAddingItem()}*/}
				{/*	/>*/}
				{/*</div>*/}
			</Card>
		</div>
	);
};

export default CardWithDialog;
