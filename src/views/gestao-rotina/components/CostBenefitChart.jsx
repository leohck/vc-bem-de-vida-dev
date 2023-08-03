import React, { useEffect, useState } from "react";
import { Card, Select } from "../../../components/ui";
import { Chart } from "../../../components/shared";
import { getCostBenefitChartData } from "../../../services/PersonalService";
import LifeAspectSegment from "./LifeAspectSegment";
import { useUserID } from "../../../hooks/useUserID";
import useResponsive from "../../../utils/hooks/useResponsive";
import { lifeAspectOptions } from "../../auto-conhecimento/form.options";

const CostBenefitChart = () => {
	const [lifeAspect, setLifeAspect] = useState(["Saude Fisica"]);
	const [chartData, setChartData] = useState([]);
	const [chartMainData, setChartMainData] = useState({});
	const [ratings, setRatings] = useState({});
	
	const { userID } = useUserID();
	const { windowWidth } = useResponsive();
	
	useEffect(() => {
		try {
			getCostBenefitChartData(userID).then(
				response => {
					setChartMainData(response.data);
					setRatings(response.data.ratings);
				}
			);
		} catch (e) {
			console.log(e);
		}
	}, [userID]);
	
	useEffect(() => {
		if (windowWidth > 640) {
			setChartData(chartMainData[lifeAspect[0]])
		} else {
			setChartData(chartMainData[lifeAspect.value]);
		}
	}, [windowWidth, lifeAspect, chartMainData]);
	
	const handleLifeAspectChange = (e) => {
		setLifeAspect(e);
	};
	
	const LifeAspectRating = () => {
		let rating_value;
		if (windowWidth > 640) {
			rating_value = ratings[lifeAspect[0]];
		} else {
			rating_value = ratings[lifeAspect.value];
		}
		if (rating_value === undefined) {
			rating_value = 3;
		}
		
		const img_src_path = "/img/ratings/";
		return (
			<div>
				<img src={`${img_src_path}rating-${rating_value}.png`}
				     alt={`life-aspect-rating-${rating_value}`}
				     width={70}
				     height={70}
				/>
			</div>
		);
	};
	
	return (
		<div className="flex flex-col justify-center">
			<div className="grid justify-items-center mb-4">
				<h4>Custo x Beneficio</h4>
			</div>
			<div className="flex flex-col gap-4 md:flex-row md:gap-4 md:justify-evenly">
				{windowWidth > 640 ? (
					<LifeAspectSegment
						value={lifeAspect}
						onChange={handleLifeAspectChange}
						singleOption={true}
						vertical={true}
					/>
				) : (
					<Select
						placeholder="Aspecto de Vida"
						className="max-w-[400px]"
						isSearchable={false}
						options={lifeAspectOptions}
						value={lifeAspect}
						onChange={(e) => handleLifeAspectChange(e)}
					/>
				)}
				
				<Card className="flex flex-col gap-2">
					<div className="grid justify-items-center">
						{lifeAspect && (
							<LifeAspectRating />
						)}
					</div>
					<div>
						<Chart
							series={chartData}
							height={500}
							type="bar"
							options={{
								chart: {
									toolbar: {
										show: false
									},
									zoom: {
										enabled: false
									}
								},
								plotOptions: {
									bar: {
										borderRadius: 4,
										horizontal: false,
										columnWidth: "55%",
										endingShape: "rounded",
										dataLabels: {
											position: "top"
										}
									}
								},
								colors: ["#16a34a", "#2563eb", "#f59e0b"],
								dataLabels: {
									enabled: true,
									position: "top",
									offsetY: 10
								},
								stroke: {
									show: true,
									width: 2,
									colors: ["transparent"]
								},
								xaxis: {
									categories: windowWidth > 640 ? lifeAspect : [lifeAspect.value]
								},
								yaxis: {
									min: 0,
									max: 100,
									forceNiceScale: false,
									labels: {
										formatter: function(val) {
											return Math.floor(val);
										}
									}
								},
								fill: {
									type: "gradient",
									opacity: 1
								}
							}}
						/>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default CostBenefitChart;
