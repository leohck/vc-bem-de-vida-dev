import React from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { AiOutlineForm } from 'react-icons/ai'
import { GiLifeBar } from 'react-icons/gi'
import { BsArrowRepeat } from 'react-icons/bs'
import { MdTimeline } from 'react-icons/md'

const navigationIcon = {
    home: <HiOutlineHome />,
    auto_conhecimento: <BsFillFilePersonFill />,
    auto_conhecimento_cadastro: <AiOutlineForm />,
    auto_conhecimento_cadastro_circulo: <GiLifeBar />,
    gestao_rotina: <BsArrowRepeat />,
    metas_projetos: <MdTimeline />
}

export default navigationIcon
