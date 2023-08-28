import React from 'react'
import { Circulo } from '../../../components/new'
import LifeAspectIcon from "../../Icon";

const VidaSocial = () => {
    const titulo = 'Vida Social'
    return (
        <Circulo
            title={titulo}
            icon={<LifeAspectIcon life_aspect={'vida_social'}/>}
        />
    )
}

export default VidaSocial
