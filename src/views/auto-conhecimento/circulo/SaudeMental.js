import React from "react";
import { Circulo } from "../../../components/new";

const SaudeMental = () => {
    const titulo = 'Saude Mental'
    const questions = [
        'Como está sua satisfação quanto à sua condição atual (estabilidade/segurança)?',
        'Como está sua satisfação ao lidar com suas emoções / sentimentos?',
        'Quão satisfeito(a) você está com a sua capacidade de alcançar seus objetivos / sonhos / desejos?'
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

export default SaudeMental

