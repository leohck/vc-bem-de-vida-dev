import React from "react";
import Index from "./Dash1";
import Graph3 from "./Dash3";
import Graph2 from "./Graph2";

function Dashboard() {
	return (
		<div className="flex flex-col gap-4 justify-evenly">
			<Index />
			<Graph2 />
			<Graph3 />
		</div>
	);
}

export default Dashboard;
