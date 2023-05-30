import React from "react";
import { Circulo } from "../../../components/new";

const VidaProfissional = () => {
    const titulo = 'Vida Profissional'
    const questions = [
        'Como você avalia sua satisfação com relação ao rumo da sua carreira profissional atual?',
        'Como está sua satisfação com a forma que você desempenha sua atividade profissional atual?',
        'Quão satisfeito(a) você está com a relevância/importância da sua atividade profissional?'
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

export default VidaProfissional

