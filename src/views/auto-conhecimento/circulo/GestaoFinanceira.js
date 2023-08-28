import React from 'react'
import { Circulo } from '../../../components/new'
import LifeAspectIcon from "../../Icon";

const GestaoFinanceira = () => {
    const title = 'Gestao Financeira'
    
    return (
        <Circulo
            title={title}
            icon={<LifeAspectIcon life_aspect={'gestao_financeira'} />}
        />
    )
}

export default GestaoFinanceira
