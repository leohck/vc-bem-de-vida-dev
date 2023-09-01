import React, { useState, useEffect } from "react";
import classNames from "classnames";
import WishCloud from "./components/WishCloud";
import { useUserID } from "../../../../hooks/useUserID";
import { getDashboard31Data } from "../../../../services/Module3/Dashboard";
import Funnel from "./components/Funnel";
import Trophies from "./components/Trophies";
import { Card, Select } from "../../../../components/ui";
import LifeAspectSegment from "../../../gestao-rotina/components/LifeAspectSegment";
import { lifeAspectOptions } from "../../../auto-conhecimento/form.options";
import useResponsive from "../../../../utils/hooks/useResponsive";


function Graph1() {
	const { userID } = useUserID();
	const { windowWidth } = useResponsive();
	const [lifeAspect, setLifeAspect] = useState([]);
	const [chartData, setChartData] = useState({});
	const [chartMainData, setChartMainData] = useState({});
	
	const handleLifeAspectChange = (e) => {
		setLifeAspect(e);
	};
	
	useEffect(() => {
		try {
			getDashboard31Data(userID).then(
				response => {
					setChartMainData(response.data);
				}
			);
		} catch (e) {
			console.log(e);
		}
	}, [userID]);
	
	useEffect(() => {
		if (windowWidth > 640) {
			if (lifeAspect.length === 0 || lifeAspect.length === 5) {
				setChartData(chartMainData["all"]);
			} else if (lifeAspect.length === 1) {
				setChartData(chartMainData[lifeAspect[0]]);
			} else {
				let data = {
					wishes: [],
					goals: [],
					achievements: []
				};
				lifeAspect.forEach(lf => {
					data.wishes.push(...chartMainData[lf].wishes);
					data.goals.push(...chartMainData[lf].goals);
					data.achievements.push(...chartMainData[lf].achievements);
				});
				console.log(data);
				setChartData(data);
			}
		} else {
			setChartData(chartMainData[lifeAspect.value]);
		}
	}, [windowWidth, lifeAspect, chartMainData]);
	
	return (
		<Card
			header={
				<h6>Desejos, Metas e Conquistas</h6>
			}
			headerClass="border-none"
			bodyClass={classNames(
				"flex flex-col items-center"
			)}
			className="h-full"
		>
			<div className={`flex flex-col gap-4 ${windowWidth < 640 && "items-center"} md:flex-row md:justify-evenly`}>
				{windowWidth > 640 ? (
					<LifeAspectSegment
						value={lifeAspect}
						onChange={handleLifeAspectChange}
						vertical={true}
						singleOption={false}
					/>
				) : (
					<Select
						placeholder="Aspecto de Vida"
						className="w-[300px] mb-2"
						isSearchable={false}
						options={lifeAspectOptions}
						value={lifeAspect}
						onChange={(e) => handleLifeAspectChange(e)}
					/>
				)}
				{chartData && (
					<div>
						<div className="flex flex-col items-center relative">
							<WishCloud wishList={chartData.wishes} />
							<Funnel goalList={chartData.goals} />
						</div>
						<div className="mt-52 md:mt-32">
							<Trophies achievementList={chartData.achievements} />
						</div>
					</div>
				)}
			</div>
		</Card>
	);
}

export default Graph1;
