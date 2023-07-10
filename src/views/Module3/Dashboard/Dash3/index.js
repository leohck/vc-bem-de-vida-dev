import React from "react";
import { Card } from "../../../../components/ui";

function Graph3() {
	return (
		<Card
			header={
				<h6>Investimento em Mudança</h6>
			}
			headerClass="border-none">
			
			<div className="flex flex-col items-center justify-center gap-3">
				<div className="flex flex-row gap-2 items-center justify-center">
					{/*<Card>R$3800</Card>*/}
					{/*<Card>1</Card>*/}
				</div>
				<div>
					{/*<GaugeMeter />*/}
				</div>
			</div>
		</Card>
	);
}

export default Graph3;
