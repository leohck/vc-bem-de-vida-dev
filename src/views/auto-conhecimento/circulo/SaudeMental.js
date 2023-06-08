import React from "react";
import { Circulo } from "../../../components/new";
import { RiMentalHealthFill } from "react-icons/ri";

const SaudeMental = () => {
    const titulo = 'Saude Mental'
    return (
        <Circulo
            title={titulo}
            icon={<RiMentalHealthFill size="4em"
                                      className="h-10"/>}
        />
    )
}

export default SaudeMental

