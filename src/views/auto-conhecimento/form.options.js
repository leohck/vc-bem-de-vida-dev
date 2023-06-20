import {
    FaWeight,
    FaHandRock,
    FaHourglassHalf,
    FaPlaneDeparture,
    FaCarSide,
    FaHouseUser,
    FaBook,
    FaPrayingHands,
    FaTrophy,
    FaGift,
    FaMoneyBillAlt,
    FaBabyCarriage,
    FaHeart,
    FaHandHoldingHeart,
    FaPaw,
    FaAward,
    FaGraduationCap,
    FaBriefcase,
} from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import { GrMoney } from 'react-icons/gr'

export const aptidoesOptions = [
    { value: '1', label: 'Comunicação', color: '#00B8D9' },
    { value: '2', label: 'Otimismo', color: '#00B8D9' },
    { value: '3', label: 'Influência', color: '#5243AA' },
    { value: '4', label: 'Sociabilidade', color: '#FF5630' },
    { value: '5', label: 'Criatividade', color: '#FF8B00' },
    { value: '6', label: 'Execução', color: '#FFC400' },
    { value: '7', label: 'Competitivade', color: '#36B37E' },
    { value: '8', label: 'Autoconfiança', color: '#00875A' },
    { value: '9', label: 'Objetividade', color: '#253858' },
    { value: '10', label: 'Foco', color: '#666666' },
    { value: '11', label: 'Individualismo', color: '#666666' },
    { value: '12', label: 'Meticulosidade', color: '#666666' },
    { value: '13', label: 'Conservadorismo', color: '#666666' },
    { value: '14', label: 'Inovação', color: '#666666' },
    { value: '15', label: 'Processual', color: '#666666' },
    { value: '16', label: 'Analítico(a)', color: '#666666' },
    { value: '17', label: 'Detalhista', color: '#666666' },
    { value: '18', label: 'Perfeccionista', color: '#666666' },
    { value: '19', label: 'Resiliência', color: '#666666' },
    { value: '20', label: 'Confiabilidade', color: '#666666' },
    { value: '21', label: 'Liderança', color: '#666666' },
    { value: '22', label: 'Autocontrole', color: '#666666' },
    { value: '23', label: 'Planejamento', color: '#666666' },
]

export const conquistasGroupedOptions = [
    {
        label: 'Saúde Física',
        options: [
            { life_aspect: 'Saude Fisica', value: '1', label: 'Condição do Corpo', icon: <FaWeight /> },
            { life_aspect: 'Saude Fisica', value: '2', label: 'Disposição / Força', icon: <FaHandRock /> },
            { life_aspect: 'Saude Fisica', value: '3', label: 'Longevidade', icon: <FaHourglassHalf /> },
        ],
    },
    {
        label: 'Saúde Mental',
        options: [
            { life_aspect: 'Saude Mental', value: '1.1', label: 'Viagem', icon: <FaPlaneDeparture /> },
            { life_aspect: 'Saude Mental', value: '2.1', label: 'Carro', icon: <FaCarSide /> },
            { life_aspect: 'Saude Mental', value: '3.1', label: 'Casa', icon: <FaHouseUser /> },
            { life_aspect: 'Saude Mental', value: '4', label: 'Conhecimento', icon: <FaBook /> },
            { life_aspect: 'Saude Mental', value: '5', label: 'Religião', icon: <FaPrayingHands /> },
            { life_aspect: 'Saude Mental', value: '6', label: 'Premiação', icon: <FaTrophy /> },
            { life_aspect: 'Saude Mental', value: '7', label: 'Comprar algo', icon: <FaGift /> },
        ],
    },
    {
        label: 'Saúde Financeira',
        options: [
            {
                life_aspect: 'Saude Financeira',
                value: '8',
                label: 'Reserva Financeira',
                icon: <FaMoneyBillAlt />,
            },
            {
                life_aspect: 'Saude Financeira',
                value: '10',
                label: 'Liberdade Financeira',
                icon: <GiReceiveMoney />,
            },
            {
                life_aspect: 'Saude Financeira',
                value: '11',
                label: 'Diversas Fontes de Renda',
                icon: <GrMoney />,
            },
        ],
    },
    {
        label: 'Vida Social',
        options: [
            { life_aspect: 'Vida Social', value: '12', label: 'Filho(a)', icon: <FaBabyCarriage /> },
            { life_aspect: 'Vida Social', value: '13', label: 'Parceiro(a)', icon: <FaHeart /> },
            { life_aspect: 'Vida Social', value: '14', label: 'Filantropia', icon: <FaHandHoldingHeart /> },
            { life_aspect: 'Vida Social', value: '15', label: 'Pet', icon: <FaPaw /> },
        ],
    },
    {
        label: 'Vida Profissional',
        options: [
            {
                life_aspect: 'Vida Profissional',
                value: '16',
                label: 'Reconhecimento Profissional',
                icon: <FaAward />,
            },
            { life_aspect: 'Vida Profissional', value: '17', label: 'Graduação', icon: <FaGraduationCap /> },
            { life_aspect: 'Vida Profissional', value: '18', label: 'Cargo / Posição', icon: <FaBriefcase /> },
        ],
    },
]
