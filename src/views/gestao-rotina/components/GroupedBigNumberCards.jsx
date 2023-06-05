import React from "react";
import BigNumberCard from "../components/BigNumberCard";
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { MdMoreTime } from "react-icons/md";
import { RiRestTimeLine } from "react-icons/ri";

const GroupedBigNumberCards = () => {
    const tagValue = 100;
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 max-w-[500px] ">
                <BigNumberCard
                    icon={tagValue > 0
                        ? <GiReceiveMoney size="2.5em" />
                        : <GiPayMoney size="2.5em" />}
                    value="R$ 280"
                    label="Saldo Financeiro Mensal"
                    tagValue={tagValue}
                    tagPrefix="R$ "
                />
                <BigNumberCard
                    icon={<MdMoreTime size="2.5em" />}
                    value="12"
                    label="Renda Ativa / Hora"
                    tagValue={4}
                    tagSuffix=" horas"
                />
                <BigNumberCard
                    icon={<RiRestTimeLine size="2.5em" />}
                    value="108"
                    label="Horas Livres / Semana"
                    tagValue={-15}
                    tagSuffix=" horas"
                    gray={true}
                />
                <BigNumberCard
                    icon={<GiTakeMyMoney size="2.5em" />}
                    value="R$ 50"
                    label="Custo / Hora Não Rentável"
                    tagValue={50}
                    tagPrefix="R$ "
                    gray={true}
                />
            </div>
        </div>
    );
};

export default GroupedBigNumberCards;