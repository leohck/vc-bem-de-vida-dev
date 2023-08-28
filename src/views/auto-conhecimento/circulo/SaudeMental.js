import React from 'react'
import { Circulo } from '../../../components/new'
import LifeAspectIcon from "../../Icon";

const SaudeMental = () => {
    const titulo = 'Saude Mental'
    return (
        <Circulo
            title={titulo}
            icon={<LifeAspectIcon life_aspect={'saude_mental'}/>}
        />
    )
}

export default SaudeMental
