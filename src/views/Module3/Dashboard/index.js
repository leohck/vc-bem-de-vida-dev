import React from "react";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";
import Graph3 from "./Graph3";

function Dashboard() {
	return (
		<div className="flex flex-col gap-4 justify-evenly">
			<Graph1 />
			<Graph2 />
			<Graph3 />
		</div>
	);
}

export default Dashboard;
