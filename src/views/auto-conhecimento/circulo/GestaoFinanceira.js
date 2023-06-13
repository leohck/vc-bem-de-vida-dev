import React from 'react'
import { Circulo } from '../../../components/new'
import { RiCoinsLine } from 'react-icons/ri'

const GestaoFinanceira = () => {
    const title = 'Gestao Financeira'
    return (
        <Circulo
            title={title}
            icon={<RiCoinsLine size="4em" className="h-10" />}
        />
    )
}

export default GestaoFinanceira
