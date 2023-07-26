import React from "react";
import WishList from "../Wish/WishList";
import GoalList from "../Goal/GoalList";

function Index() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<WishList />
			</div>
			<div>
				<GoalList />
			</div>
		</div>
	);
}

export default Index;
