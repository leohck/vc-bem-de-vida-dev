import React, { useState } from "react";
import WishForm from "./WishForm";
import WishList from "./WishList";

function Wish() {
	const [itemToEdit, setItemToEdit] = useState(null);


	return (
		<div className="flex flex-col gap-4 justify-between">
			<WishForm itemToEdit={itemToEdit}
			          setItemToEdit={setItemToEdit}
			/>
			<WishList setItemToEdit={setItemToEdit} />
		</div>
	);
}

export default Wish;
