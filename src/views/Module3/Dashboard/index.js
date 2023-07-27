import React from "react";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";
import Graph3 from "./Graph3";

function Dashboard() {
	return (
		<div className="flex flex-col gap-4 justify-evenly">
			<Graph2 />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Graph1 />
				<Graph3 />
			</div>
		</div>
	);
}

export default Dashboard;
