import React, { useState } from "react";
import { Card, Select } from "../../../../components/ui";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard32Data } from "../../../../services/Module3/Dashboard";
import AreaChart from "./components/AreaChart";
import useResponsive from "../../../../utils/hooks/useResponsive";
import { lifeAspectOptions } from "../../../auto-conhecimento/form.options";


function Graph2() {
	const { userID } = useUserID();
	const [graphType, setGraphType] = useState(lifeAspectOptions[0]);
	const { windowWidth } = useResponsive();
	
	const { isLoading, error, data } = useQuery({
		queryKey: ["Dashboard32Data"],
		queryFn: () => getDashboard32Data(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	const graphData = data.data;
	
	return (
		<Card
			header={
				<h6>Linha do Tempo Conquistas / Metas</h6>
			}
			headerClass="border-none"
		>
			{windowWidth > 640 ? (
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
					<AreaChart
						type={"Saude Fisica"}
						data={graphData}
					/>
					<AreaChart
						type={"Saude Mental"}
						data={graphData}
					/>
					<AreaChart
						type={"Vida Social"}
						data={graphData}
					/>
					<AreaChart
						type={"Vida Profissional"}
						data={graphData}
					/>
					<AreaChart
						type={"Gestao Financeira"}
						data={graphData}
					/>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<Select
						placeholder="Aspecto de Vida"
						className="max-w-[400px]"
						isSearchable={false}
						options={lifeAspectOptions}
						value={graphType}
						onChange={(e) => setGraphType(e)}
					/>
					<AreaChart type={graphType.value} data={graphData} />
				</div>
			)}
		
		</Card>
	);
}

export default Graph2;
