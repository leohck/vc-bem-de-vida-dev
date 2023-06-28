import React from "react";
import AchievementList from "../../Achievement/AchievementList";
import WishList from "../Wish/WishList";
import store from "../../../store";

function Index() {
	const { auth } = store.getState();
	const userID = auth.user.user_info_id;

	return (
		<div className="flex flex-row gap-4 justify-between">
			<div className="w-1/2">
				<WishList userID={userID}/>
			</div>
			<div className="w-1/2">
				<AchievementList />
			</div>
		</div>
	);
}

export default Index;
