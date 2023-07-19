import React from "react";
import { Card } from "../../../components/ui";
import ChangePassword from "./ChangePassword";

function Index() {
	return (
		<div className="flex flex-row justify-center">
			<Card header="Alterar Senha"
				className="w-[600px] max-w-[600px]"
			>
				<ChangePassword />
			</Card>
		</div>
	);
}

export default Index;
