import React from "react";
import store from "../../../store";
import WishList from "../Wish/WishList";
import GoalList from "../Goal/GoalList";

function Index() {
	const { auth } = store.getState();
	const userID = auth.user.user_info_id;

	return (
		<div className="flex flex-row gap-4 justify-between">
			<div className="w-1/2">
				<WishList userID={userID} />
			</div>
			<div className="w-1/2">
				<GoalList />
			</div>
		</div>
	);
}

export default Index;
