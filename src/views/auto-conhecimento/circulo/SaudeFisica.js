import React from "react";
import {Circulo} from "../../../components/new";

const SaudeFisica = () => {
    const titulo = 'Saude Fisica'
    const questions = [
        'Como está sua satisfação com a sua disposição para atividades diária?',
        'Como está sua satisfação com a sua condição de saúde (uso de medicamentos / dores)?',
        'Como está sua satisfação com seu corpo (visual)?'
    ]
    return (
        <Circulo
            title={titulo}
            question1={questions[0]}
            question2={questions[1]}
            question3={questions[2]}
        />
    )
}

export default SaudeFisica