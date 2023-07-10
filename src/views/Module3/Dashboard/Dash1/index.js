import React from "react";
import classNames from "classnames";
import WishCloud from "./components/WishCloud";
import { useWishList } from "../../../../hooks/module3/useWishList";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard31Data } from "../../../../services/Module3/Dashboard";
import Funnel from "./components/Funnel";
import Trophies from "./components/Trophies";
import { Card } from "../../../../components/ui";

function Index() {
	const { wishes } = useWishList();
	const { userID } = useUserID();
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ["data"],
		queryFn: () => getDashboard31Data(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	return (
		<Card
			header={
				<h6>Desejos Metas e Conquistas</h6>
			}
			headerClass="border-none"
			bodyClass={classNames(
				"flex flex-col gap-5 items-center"
			)}>
			<div>
				<WishCloud wishList={wishes} />
			</div>
			<div>
				<Funnel goalList={data?.data["goals"]} />
			</div>
			<div>
				<Trophies achievementList={data?.data["achievements"]} />
			</div>
		</Card>
	);
}

export default Index;
