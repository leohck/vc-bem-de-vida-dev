import React from "react";
import { Card } from "../../../../components/ui";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard33Data } from "../../../../services/Module3/Dashboard";
import PieChart from "./components/PieChart";

function Graph3() {
	const { userID } = useUserID();
	
	const { isLoading, error, data } = useQuery({
		queryKey: ["Dashboard33Data"],
		queryFn: () => getDashboard33Data(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	const graph_data = data.data;
	
	return (
		<Card
			header={
				<h6>Investimento em Mudança</h6>
			}
			headerClass="border-none"
		>
			<div className="flex flex-col items-center">
				<PieChart data={graph_data} />
			</div>
		</Card>
	);
}

export default Graph3;
