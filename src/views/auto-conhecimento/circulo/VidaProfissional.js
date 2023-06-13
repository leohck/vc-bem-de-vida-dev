import React from 'react'
import { Circulo } from '../../../components/new'
import { FaHandshake } from 'react-icons/fa'

const VidaProfissional = () => {
    const titulo = 'Vida Profissional'
    return (
        <Circulo
            title={titulo}
            icon={<FaHandshake size="4em" className="h-10" />}
        />
    )
}

export default VidaProfissional
