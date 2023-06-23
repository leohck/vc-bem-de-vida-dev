import React, { useState } from "react";
import WishForm from "./WishForm";
import WishList from "./WishList";
import store from "../../../store";

function Wish() {
	const [itemToEdit, setItemToEdit] = useState(null);

	const { auth } = store.getState();
	const userID = auth.user.user_info_id;

	return (
		<div className="flex flex-col gap-4 justify-between">
			<WishForm
				userID={userID}
				itemToEdit={itemToEdit}
				setItemToEdit={setItemToEdit}
			/>
			<WishList
				userID={userID}
				setItemToEdit={setItemToEdit}
			/>
		</div>
	);
}

export default Wish;
