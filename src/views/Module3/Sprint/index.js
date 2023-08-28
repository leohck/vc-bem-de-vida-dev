import React from "react";
import { useUserID } from "../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { createSprint, getSprintData } from "../../../services/Module3/SprintService";
import { Select } from "../../../components/ui";
import { ESTIMATED_DAYS_OPTIONS } from "./constants";
import SprintConfig from "./components/SprintConfig";

function Sprint() {
	const { userID } = useUserID();
	
	const { isLoading, isError, error, data } = useQuery({
		queryKey: ["SprintData", userID],
		queryFn: () => getSprintData(userID),
		refetchOnMount: true
	});
	if (isLoading) return "Loading...";
	if (isError) return "An error has occurred: " + error.message;
	
	const sprint = data.data;
	
	const handleChangeEstimatedDays = async (estimated_days) => {
		if (!sprint.has_sprint) {
			createSprint(userID, estimated_days.value)
				.then(() => {
					window.location.reload();
				});
		}
	};
	
	return (
		<div>
			{
				sprint.has_sprint
					? <SprintConfig sprint={sprint}/>
					: (
						<div className="flex flex-row items-center gap-10">
							<h6>Duração da Sprint: </h6>
							<Select
								className="w-[150px]"
								options={ESTIMATED_DAYS_OPTIONS}
								onChange={(e) => handleChangeEstimatedDays(e)}
							/>
						</div>
					)
			}
		
		</div>
	);
}

export default Sprint;
