import React, { useState, useCallback } from "react";
import { Card, Segment } from "../../../../components/ui";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard32Data } from "../../../../services/Module3/Dashboard";
import AreaChart from "./components/AreaChart";


function Graph2() {
	const { userID } = useUserID();
	const [graphType, setGraphType] = useState(["Saude Fisica"]);
	const handleGraphTypeChange = useCallback((val) => {
		setGraphType(val);
	}, []);
	
	const { isLoading, error, data } = useQuery({
		queryKey: ["Dashboard32Data"],
		queryFn: () => getDashboard32Data(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	const graphData = data.data;
	
	const headerExtraContent = (
		<span className="flex items-center">
			<Segment
				onChange={handleGraphTypeChange}
				value={graphType}
				size="xs"
			>
				<Segment.Item value="Saude Fisica">Saúde Física</Segment.Item>
				<Segment.Item value="Saude Mental">Saúde Mental</Segment.Item>
				<Segment.Item value="Vida Social">Vida Social</Segment.Item>
				<Segment.Item value="Vida Profissional">Vida Profissional</Segment.Item>
				<Segment.Item value="Gestao Financeira">Gestão Financeira</Segment.Item>
			</Segment>
        </span>
	);
	
	return (
		<Card
			header={
				<h6>Linha do Tempo Conquistas / Metas</h6>
			}
			// headerExtra={headerExtraContent}
			headerClass="border-none"
		>
			<div className="grid grid-cols-5 gap-4">
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
			{/*<div className="grid grid-cols-2 justify-items-evenly">*/}
			{/*	*/}
			{/*</div>*/}
		</Card>
	);
}

export default Graph2;
