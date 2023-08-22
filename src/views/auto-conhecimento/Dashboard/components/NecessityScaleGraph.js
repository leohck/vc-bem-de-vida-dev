import React, { useState } from "react";
import classNames from "classnames";
import { ImArrowRight } from "react-icons/im";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard12Data } from "../../../../services/Module1/Dashboard";

function NecessityScaleGraph() {
	const { userID } = useUserID();
	const { isLoading, error, data } = useQuery({
		queryKey: ["Dashboard12Data"],
		queryFn: () => getDashboard12Data(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	const img_src_path = "/img/new/";
	const img_src = img_src_path + "maslow.png";
	
	const Arrow = ({ position }) => {
		let arrow_color;
		if (position <= 30) {
			arrow_color = "#fe1016";
		} else if (position <= 55) {
			arrow_color = "#fe7a22";
		} else if (position <= 75) {
			arrow_color = "#e8e836";
		} else if (position <= 90) {
			arrow_color = "#17cf2c";
		} else {
			arrow_color = "#2a2cf8";
		}
		
		if (position <= 15) {
			position -= 6;
		} else if (position <= 30) {
			position -= 6;
		} else if (position <= 31) {
			position -= 3;
		} else if (position <= 45) {
			position -= 10;
		} else if (position <= 55) {
			position -= 7;
		} else if (position <= 65) {
			position -= 8;
		} else if (position <= 75) {
			position -= 12;
		} else if (position <= 85) {
			position -= 6;
		} else if (position <= 90) {
			position -= 11;
		} else if (position <= 100) {
			position -= 9;
		}
		
		return (
			<div id="arrow"
			     className={classNames(
				     "absolute",
				     position <= 10
					     ? "mb-10"
					     : ""
			     )}
			     style={{ bottom: position + "%" }
			     }
			>
				<ImArrowRight color={arrow_color} size="3em"/>
			</div>
		);
	};
	
	return (
		<div className="flex flex-col gap-1">
			<h6>Escala de Necessidades</h6>
			<div className="flex flex-row items-center justify-center">
				<div className={classNames(
					"h-[350px] w-[200px] md:w-[200px] md:h-[500px]",
					"bg-contain bg-no-repeat bg-center",
					"relative"
				)}
				     style={{
					     backgroundImage: `url(${img_src})`
				     }}
				>
					<Arrow position={data.data.rating} />
				</div>
			</div>
		</div>
	);
}

export default NecessityScaleGraph;
