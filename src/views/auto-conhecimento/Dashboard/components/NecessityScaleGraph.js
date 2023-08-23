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
	const arrow_img_src_path = "/img/setas/";
	const img_src = img_src_path + "maslow.png";
	let arrow_src = arrow_img_src_path + "vermelha.png";
	
	const Arrow = ({ position }) => {
		if (position <= 30) {
			arrow_src = arrow_img_src_path + "vermelha.png";
		} else if (position <= 55) {
			arrow_src = arrow_img_src_path + "laranja.png";
		} else if (position <= 75) {
			arrow_src = arrow_img_src_path + "amarela.png";
		} else if (position <= 90) {
			arrow_src = arrow_img_src_path + "verde.png";
		} else {
			arrow_src = arrow_img_src_path + "azul.png";
		}
		
		if (position <= 15) {
			position -= 8;
		} else if (position <= 30) {
			position -= 6;
		} else if (position <= 31) {
			position -= 8;
		} else if (position <= 55) {
			position -= 11;
		} else if (position <= 65) {
			position -= 8;
		} else if (position <= 75) {
			position -= 12;
		} else if (position <= 85) {
			position -= 9;
		} else if (position <= 100) {
			position -= 11;
		}
		
		return (
			<div id="arrow"
			     className={classNames(
				     "absolute",
				     position <= 10
					     ? "mb-10"
					     : ""
			     )}
			     style={{ bottom: position + "%", left: -50 }
			     }
			>
				<img src={arrow_src} alt="seta" width={100}/>
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
