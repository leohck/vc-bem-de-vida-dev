import React from "react";
import {Circulo} from "../../../components/new";

const VidaSocial = () => {
    const titulo = 'Vida Social'
    const questions = [
        'Quão satisfeito(a) você está com a sua relação/condição familiar?',
        'Como está sua satisfação com sua relação interpessoal com amigos?',
        'Quão satisfeito(a) você está com sua imagem perante aos outros?'
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

export default VidaSocial