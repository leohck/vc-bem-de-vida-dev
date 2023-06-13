import React from 'react'
import { Circulo } from '../../../components/new'
import { GiHealthNormal } from 'react-icons/gi'

const SaudeFisica = () => {
    const titulo = 'Saude Fisica'
    return (
        <Circulo
            title={titulo}
            icon={<GiHealthNormal size="4em" className="h-10" />}
        />
    )
}

export default SaudeFisica
