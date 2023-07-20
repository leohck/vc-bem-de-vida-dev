import React, { useState, useCallback } from "react";
import { Card, Segment, Tooltip } from "../../../../components/ui";
import convertToReal from "../../../../utils/moneyWrapper";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard33Data } from "../../../../services/Module3/Dashboard";
import StackedBar from "./components/StackedBar";

function Graph3() {
	const { userID } = useUserID();
	
	const [graphType, setGraphType] = useState(["time_spent"]);
	const handleGraphTypeChange = useCallback((val) => {
		setGraphType(val);
	}, []);
	
	const { isLoading, error, data } = useQuery({
		queryKey: ["Dashboard33Data"],
		queryFn: () => getDashboard33Data(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	const graph_data = data.data;
	
	const BigNumber = ({ type, data, title }) => {
		return (
			<Tooltip title={title}>
				<Card
					className="w-[300px]"
					bodyClass="flex flex-row justify-center">
					{type === "time_spent" && (
						<h4>{data.time_spent} H</h4>
					)}
					{type === "money_spent" && (
						<h4>{convertToReal(data.money_spent)}</h4>
					)}
				</Card>
			</Tooltip>
		);
	};
	
	const headerExtraContent = (
		<span className="flex items-center">
			<Segment
				onChange={handleGraphTypeChange}
				value={graphType}
				size="xs"
			>
				<Segment.Item value="time_spent">Tempo</Segment.Item>
				<Segment.Item value="money_spent">Dinheiro</Segment.Item>
			</Segment>
        </span>
	);
	
	return (
		<Card
			header={
				<h6>Investimento em Mudança</h6>
			}
			headerExtra={headerExtraContent}
			headerClass="border-none"
		>
			<div className="flex flex-col items-center justify-center gap-3">
				<div className="flex flex-row gap-2 items-center justify-center">
					<BigNumber
						type={graphType[0]}
						data={graph_data.bignumber1}
						title="Recurso investido em Rotina"
					/>
					<BigNumber
						type={graphType[0]}
						data={graph_data.bignumber2}
						title="Recurso investido em Mudança"
					/>
				</div>
				<div className="w-[980px] h-[400px]">
					<StackedBar
						type={graphType[0]}
						data={graph_data} />
				</div>
			</div>
		</Card>
	);
}

export default Graph3;
