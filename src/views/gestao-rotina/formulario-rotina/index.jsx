import React from "react";
import {
    Input,
    Button,
    Card
} from "components/ui";

import LifeAspectSegment from "./components/LifeAspectSegment";
import WeekdaySegment from "./components/WeekdaySegment";
import EnergyLevelSegment from "./components/EnergyLevelSegment";
import ActionMoneySegment from "./components/ActionMoneySegment";

const Layout = () => {

    const cardFooter = (
        <div className="flex justify-items-end">
            <Button size="sm" variant="solid">
                Salvar
            </Button>
        </div>
    );

    return (
        <div>
            <div className="mb-8 grid justify-items-center">
                <h3>Cadastrar Ação de Rotina</h3>
            </div>

            <Card footer={cardFooter}>

                <div className="flex flex-row items-center">
                    <p className="font-bold text-lg">Ação de Rotina: </p>
                    <Input className="max-w-sm ml-16"
                           placeholder="Nome da Ação de Rotina" />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">Aspecto de Vida Influenciado pela Ação: </p>
                    <LifeAspectSegment />
                </div>

                <div className="flex flex-row items-center mt-10">
                    <p className="font-bold text-lg">Quantas horas / dia são necessárias para esta ação: </p>
                    <Input className="max-w-sm ml-16"
                           type="number"
                           step={0.5}
                           min={1}
                           max={24}
                           placeholder="Quantas horas são necessárias" />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">Em quais dias da semana esta ação é executada? </p>
                    <WeekdaySegment />
                </div>

                <div className="flex flex-col justify-items-center mt-10">
                    <p className="font-bold text-lg">Considerando a escala abaixo, como você classifica o nível de energia (esforço/atenção) despendido nesta ação? </p>
                    <EnergyLevelSegment />
                </div>

                <div className="flex flex-row items-center gap-[200px] mt-10">
                    <div className="flex flex-col">
                        <p className="font-bold text-lg">Esta Ação?</p>
                        <ActionMoneySegment />
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-lg">Quanto por mês é gasto com esta ação? </p>
                        <Input className="max-w-sm"
                               type="number"
                               prefix="R$"/>
                    </div>

                </div>

            </Card>

        </div>
    );
};

export default Layout;

