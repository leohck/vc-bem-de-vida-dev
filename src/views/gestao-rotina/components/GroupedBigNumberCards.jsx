import React from "react";
import BigNumberCard from "../components/BigNumberCard";
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { MdMoreTime } from "react-icons/md";
import { RiRestTimeLine } from "react-icons/ri";

const GroupedBigNumberCards = (props) => {
    const {
        card1Value,
        card2Value,
        card3Value,
        card4Value
    } = props;
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 max-w-[500px] ">
                <BigNumberCard
                    icon={card1Value.value > 0
                        ? <GiReceiveMoney size="2.5em" />
                        : <GiPayMoney size="2.5em" />}
                    value={"R$ " + card1Value.value}
                    label="Saldo Financeiro Mensal"
                    tagValue={card1Value.tagValue}
                    tagPrefix="R$ "
                />
                <BigNumberCard
                    icon={<MdMoreTime size="2.5em" />}
                    value={"R$ " + card2Value.value}
                    label="Renda Ativa / Hora"
                    tagValue={card2Value.tagValue}
                    tagSuffix=" horas"
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
                    value={"R$ " + card4Value.value}
                    label="Custo / Hora Não Rentável"
                    tagValue={card4Value.tagValue}
                    tagPrefix="R$ "
                    gray={true}
                />
            </div>
        </div>
    );
};

export default GroupedBigNumberCards;