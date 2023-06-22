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
	FaBriefcase
} from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";

export const aptidoesOptions = [
	{ value: "1", label: "Comunicação", color: "#00B8D9" },
	{ value: "2", label: "Otimismo", color: "#00B8D9" },
	{ value: "3", label: "Influência", color: "#5243AA" },
	{ value: "4", label: "Sociabilidade", color: "#FF5630" },
	{ value: "5", label: "Criatividade", color: "#FF8B00" },
	{ value: "6", label: "Execução", color: "#FFC400" },
	{ value: "7", label: "Competitivade", color: "#36B37E" },
	{ value: "8", label: "Autoconfiança", color: "#00875A" },
	{ value: "9", label: "Objetividade", color: "#253858" },
	{ value: "10", label: "Foco", color: "#666666" },
	{ value: "11", label: "Individualismo", color: "#666666" },
	{ value: "12", label: "Meticulosidade", color: "#666666" },
	{ value: "13", label: "Conservadorismo", color: "#666666" },
	{ value: "14", label: "Inovação", color: "#666666" },
	{ value: "15", label: "Processual", color: "#666666" },
	{ value: "16", label: "Analítico(a)", color: "#666666" },
	{ value: "17", label: "Detalhista", color: "#666666" },
	{ value: "18", label: "Perfeccionista", color: "#666666" },
	{ value: "19", label: "Resiliência", color: "#666666" },
	{ value: "20", label: "Confiabilidade", color: "#666666" },
	{ value: "21", label: "Liderança", color: "#666666" },
	{ value: "22", label: "Autocontrole", color: "#666666" },
	{ value: "23", label: "Planejamento", color: "#666666" }
];

export const conquistasOptions = [

	{ life_aspect: "Saude Fisica", value: "1", label: <FaWeight /> },
	{ life_aspect: "Saude Fisica", value: "2", label: <FaHandRock /> },
	{ life_aspect: "Saude Fisica", value: "3", label: <FaHourglassHalf /> },

	{ life_aspect: "Saude Mental", value: "4", label: <FaPlaneDeparture /> },
	{ life_aspect: "Saude Mental", value: "5", label: <FaCarSide /> },
	{ life_aspect: "Saude Mental", value: "6", label: <FaHouseUser /> },
	{ life_aspect: "Saude Mental", value: "7", label: <FaBook /> },
	{ life_aspect: "Saude Mental", value: "8", label: <FaPrayingHands /> },
	{ life_aspect: "Saude Mental", value: "9", label: <FaTrophy /> },
	{ life_aspect: "Saude Mental", value: "10", label: <FaGift /> },

	{ life_aspect: "Saude Financeira", value: "11", label: <FaMoneyBillAlt /> },
	{ life_aspect: "Saude Financeira", value: "12", label: <GiReceiveMoney /> },
	{ life_aspect: "Saude Financeira", value: "13", label: <GrMoney /> },

	{ life_aspect: "Vida Social", value: "14", label: <FaBabyCarriage /> },
	{ life_aspect: "Vida Social", value: "15", label: <FaHeart /> },
	{ life_aspect: "Vida Social", value: "16", label: <FaHandHoldingHeart /> },
	{ life_aspect: "Vida Social", value: "17", label: <FaPaw /> },

	{ life_aspect: "Vida Profissional", value: "18", label: <FaAward /> },
	{ life_aspect: "Vida Profissional", value: "19", label: <FaGraduationCap /> },
	{ life_aspect: "Vida Profissional", value: "20", label: <FaBriefcase /> }

];

export const getAchievementIconFromValue = (value) => {
	return conquistasOptions.filter(option => option.value === value)[0].label;
};