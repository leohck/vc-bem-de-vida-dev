import React from "react";
import LifeAspectColumn from "./components/LifeAspectColumn";
import classNames from "classnames";
import WishCloud from "./components/WishCloud";
import { useWishList } from "../../../../hooks/module3/useWishList";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard31Data } from "../../../../services/Module3/Dashboard";

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
		<div className={classNames(
			"flex flex-col gap-5 items-center"
		)}>
			<div>
				<WishCloud wishList={wishes} />
			</div>
			<div className="flex flex-row items-center gap-5">
				<LifeAspectColumn
					lifeAspect="Saude Fisica"
					aspectRating={1}
					cardsData={data.data['Saude Fisica']}
				/>
				<LifeAspectColumn
					lifeAspect="Saude Mental"
					aspectRating={2}
					cardsData={data.data['Saude Mental']}
				/>
				<LifeAspectColumn
					lifeAspect="Vida Social"
					aspectRating={3}
					cardsData={data.data['Vida Social']}
				/>
				<LifeAspectColumn
					lifeAspect="Vida Profissional"
					aspectRating={4}
					cardsData={data.data['Vida Profissional']}
				/>
				<LifeAspectColumn
					lifeAspect="Gestao Financeira"
					aspectRating={5}
					cardsData={data.data['Gestao Financeira']}
				/>
			</div>
		</div>
	);
}

export default Index;
