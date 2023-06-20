import React from "react";
import BigNumberCard from "../components/BigNumberCard";
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { MdMoreTime } from "react-icons/md";
import { RiRestTimeLine } from "react-icons/ri";

function convertToReal(number) {
	return Intl.NumberFormat(
		"pt-br",
		{ style: "currency", currency: "BRL" }
	).format(number);
}


const GroupedBigNumberCards = (props) => {
	const { card1Value, card2Value, card3Value, card4Value } = props;
	return (
		<div>
			<div className="grid justify-items-center mb-12">
				<h4>Gestão Financeira</h4>
			</div>
			<div className="grid grid-cols-2 gap-4 max-w-[500px] ">
				<BigNumberCard
					icon={
						card1Value.value > 0 ? (
							<GiReceiveMoney size="2.5em" />
						) : (
							<GiPayMoney size="2.5em" />
						)
					}
					value={convertToReal(card1Value.value)}
					label="Saldo Financeiro Mensal"
					tagValue={card1Value.tagValue}
					tagPrefix="R$ "
				/>
				<BigNumberCard
					icon={<MdMoreTime size="2.5em" />}
					value={convertToReal(card2Value.value)}
					label="Renda Ativa / Hora"
					tagValue={card2Value.tagValue}
					tagPrefix="R$ "
				/>
				<BigNumberCard
					icon={<RiRestTimeLine size="2.5em" />}
					value={card3Value.value}
					label="Horas Livres / Semana"
					tagValue={card3Value.tagValue}
					tagSuffix=" horas"
					gray={true}
				/>
				<BigNumberCard
					icon={<GiTakeMyMoney size="2.5em" />}
					value={convertToReal(card4Value.value)}
					label="Custo / Hora Não Rentável"
					tagValue={card4Value.tagValue}
					tagPrefix="R$ "
					reverse={true}
				/>
			</div>
		</div>
	);
};

export default GroupedBigNumberCards;
