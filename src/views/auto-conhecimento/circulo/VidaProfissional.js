import React from 'react'
import { Circulo } from '../../../components/new'
import LifeAspectIcon from "../../Icon";

const VidaProfissional = () => {
    const titulo = 'Vida Profissional'
    return (
        <Circulo
            title={titulo}
            icon={<LifeAspectIcon life_aspect={'vida_profissional'}/>}
        />
    )
}

export default VidaProfissional
