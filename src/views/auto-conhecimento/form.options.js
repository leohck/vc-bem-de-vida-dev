import {
	FaWeight,
	FaPlaneDeparture,
	FaCarSide,
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
	FaBriefcase, FaHouseUser, FaUserFriends
} from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney, GiSailboat, GiStrong } from "react-icons/gi";
import { GrCertificate, GrMoney } from "react-icons/gr";
import { BsGiftFill, BsHeartPulseFill, BsPersonHearts } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import { MdFamilyRestroom, MdGroups, MdPets } from "react-icons/md";
import { ImBriefcase } from "react-icons/im";
import { IconContext } from "react-icons";
import LifeAspectIconMicro from "../Icon/LifeAspectIconMicro";

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

export const lifeAspectList = [
	"Saude Fisica",
	"Saude Mental",
	"Gestao Financeira",
	"Vida Social",
	"Vida Profissional"
];

export const lifeAspectOptions = [
	{ value: "Saude Fisica", label: "Saude Fisica" },
	{ value: "Saude Mental", label: "Saude Mental" },
	{ value: "Vida Social", label: "Vida Social" },
	{ value: "Vida Profissional", label: "Vida Profissional" },
	{ value: "Gestao Financeira", label: "Gestão Financeira" }
];

export const conquistasOptions = [
	
	{ life_aspect: "Saude Fisica", value: "1", label:
			<LifeAspectIconMicro life_aspect={'saude_fisica'} icon={'peso'}/> },
	{ life_aspect: "Saude Fisica", value: "2", label:
			<LifeAspectIconMicro life_aspect={'saude_fisica'} icon={'disposicao'}/> },
	{ life_aspect: "Saude Fisica", value: "3", label:
			<LifeAspectIconMicro life_aspect={'saude_fisica'} icon={'vida_saudavel'}/> },
	
	{ life_aspect: "Saude Mental", value: "4",
		label: <LifeAspectIconMicro life_aspect={'saude_mental'} icon={'viagem_aviao'}/> },
	{ life_aspect: "Saude Mental", value: "5",
		label: <LifeAspectIconMicro life_aspect={'saude_mental'} icon={'carro'}/> },
	{ life_aspect: "Saude Mental", value: "6",
		label: <LifeAspectIconMicro life_aspect={'saude_mental'} icon={'moradia'}/> },
	{ life_aspect: "Saude Mental", value: "7",
		label: <LifeAspectIconMicro life_aspect={'saude_mental'} icon={'conhecimento'}/> },
	{ life_aspect: "Saude Mental", value: "8",
		label: <LifeAspectIconMicro life_aspect={'saude_mental'} icon={'fe'}/> },
	{ life_aspect: "Saude Mental", value: "9",
		label: <LifeAspectIconMicro life_aspect={'saude_mental'} icon={'trofeu'}/> },
	{ life_aspect: "Saude Mental", value: "10",
		label: <LifeAspectIconMicro life_aspect={'saude_mental'} icon={'presente'}/> },
	{ life_aspect: "Saude Mental", value: "11",
		label: <LifeAspectIconMicro life_aspect={'saude_mental'} icon={'viagem_navio'}/> },
	
	{ life_aspect: "Gestao Financeira", value: "12",
		label: <LifeAspectIconMicro life_aspect={'gestao_financeira'} icon={'fonte_renda'}/> },
	{ life_aspect: "Gestao Financeira", value: "13",
		label: <LifeAspectIconMicro life_aspect={'gestao_financeira'} icon={'fundo_renda'}/> },
	{ life_aspect: "Gestao Financeira", value: "14",
		label: <LifeAspectIconMicro life_aspect={'gestao_financeira'} icon={'controle_despesa'}/> },
	
	{ life_aspect: "Vida Social", value: "15",
		label: <LifeAspectIconMicro life_aspect={'vida_social'} icon={'filhos'}/> },
	{ life_aspect: "Vida Social", value: "16",
		label: <LifeAspectIconMicro life_aspect={'vida_social'} icon={'relacao_amorosa'}/> },
	{ life_aspect: "Vida Social", value: "17",
		label: <LifeAspectIconMicro life_aspect={'vida_social'} icon={'doacao'}/> },
	{ life_aspect: "Vida Social", value: "18",
		label: <LifeAspectIconMicro life_aspect={'vida_social'} icon={'pets'}/> },
	{ life_aspect: "Vida Social", value: "19",
		label: <LifeAspectIconMicro life_aspect={'vida_social'} icon={'familia'}/> },
	{ life_aspect: "Vida Social", value: "20",
		label: <LifeAspectIconMicro life_aspect={'vida_social'} icon={'comunidade'}/> },
	{ life_aspect: "Vida Social", value: "21",
		label: <LifeAspectIconMicro life_aspect={'vida_social'} icon={'amigos'}/> },
	
	{ life_aspect: "Vida Profissional", value: "22",
		label: <LifeAspectIconMicro life_aspect={'vida_profissional'} icon={'trabalho'}/> },
	{ life_aspect: "Vida Profissional", value: "23",
		label: <LifeAspectIconMicro life_aspect={'vida_profissional'} icon={'reconhecimento'}/> },
	{ life_aspect: "Vida Profissional", value: "24",
		label: <LifeAspectIconMicro life_aspect={'vida_profissional'} icon={'certificacao'}/> },
	{ life_aspect: "Vida Profissional", value: "25",
		label: <LifeAspectIconMicro life_aspect={'vida_profissional'} icon={'graduacao'}/> }

];

export const getIconsByLifeAspect = (lifeAspect) => {
	return conquistasOptions.filter(option => option.life_aspect === lifeAspect);
};

export const getAchievementIconFromValue = (value) => {
	try {
		return conquistasOptions.filter(option => option.value === value)[0].label;
	} catch (e) {
		return "";
	}
};

export const getAchievementFromValue = (value) => {
	return conquistasOptions.filter(option => option.value === value)[0];
};