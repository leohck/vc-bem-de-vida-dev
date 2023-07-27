import React from "react";
import classNames from "classnames";
import WishCloud from "./components/WishCloud";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard31Data } from "../../../../services/Module3/Dashboard";
import Funnel from "./components/Funnel";
import Trophies from "./components/Trophies";
import { Card } from "../../../../components/ui";

function Graph1() {
	const { userID } = useUserID();
	const { isLoading, isError, error, data} = useQuery({
		queryKey: ["Graph1Data", userID],
		queryFn: () => getDashboard31Data(userID),
		refetchOnMount: true,
	});
	if (isLoading) return "Loading...";
	if (isError) return "An error has occurred: " + error.message;
	
	return (
		<Card
			header={
				<h6>Desejos Metas e Conquistas</h6>
			}
			headerClass="border-none"
			bodyClass={classNames(
				"flex flex-col items-center"
			)}>
			<div>
				<WishCloud wishList={data.data["wishes"]} />
			</div>
			<div>
				<Funnel goalList={data.data["goals"]} />
			</div>
			<div>
				<Trophies achievementList={data.data["achievements"]} />
			</div>
		</Card>
	);
}

export default Graph1;
