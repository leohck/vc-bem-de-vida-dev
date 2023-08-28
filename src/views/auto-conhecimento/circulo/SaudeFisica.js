import React from 'react'
import { Circulo } from '../../../components/new'
import LifeAspectIcon from "../../Icon";

const SaudeFisica = () => {
    const titulo = 'Saude Fisica'
    return (
        <Circulo
            title={titulo}
            icon={<LifeAspectIcon life_aspect={'saude_fisica'}/>}
        />
    )
}

export default SaudeFisica
