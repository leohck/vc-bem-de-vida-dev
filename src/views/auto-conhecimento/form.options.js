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
	
	{ life_aspect: "Saude Fisica", value: "1", label: <FaWeight size="2.5em" /> },
	{ life_aspect: "Saude Fisica", value: "2", label: <GiStrong size="2.5em" /> },
	{ life_aspect: "Saude Fisica", value: "3", label: <BsHeartPulseFill size="2.5em" /> },
	
	{ life_aspect: "Saude Mental", value: "4", label: <FaPlaneDeparture size="2.5em" /> },
	{ life_aspect: "Saude Mental", value: "5", label: <FaCarSide size="2.5em" /> },
	{ life_aspect: "Saude Mental", value: "6", label: <FaHouseUser size="2.5em" /> },
	{ life_aspect: "Saude Mental", value: "7", label: <FaBook size="2.5em" /> },
	{ life_aspect: "Saude Mental", value: "8", label: <FaPrayingHands size="2.5em" /> },
	{ life_aspect: "Saude Mental", value: "9", label: <FaTrophy size="2.5em" /> },
	{ life_aspect: "Saude Mental", value: "10", label: <BsGiftFill size="2.5em" /> },
	{ life_aspect: "Saude Mental", value: "11", label: <GiSailboat size="2.5em" /> },
	
	{ life_aspect: "Gestao Financeira", value: "12", label: <GiReceiveMoney size="2.5em" /> },
	{ life_aspect: "Gestao Financeira", value: "13", label: <TbPigMoney size="2.5em" /> },
	{ life_aspect: "Gestao Financeira", value: "14", label: <GiPayMoney size="2.5em" /> },
	
	{ life_aspect: "Vida Social", value: "15", label: <FaBabyCarriage size="2.5em" /> },
	{ life_aspect: "Vida Social", value: "16", label: <BsPersonHearts size="2.5em" /> },
	{ life_aspect: "Vida Social", value: "17", label: <FaHandHoldingHeart size="2.5em" /> },
	{ life_aspect: "Vida Social", value: "18", label: <MdPets size="2.5em" /> },
	{ life_aspect: "Vida Social", value: "19", label: <MdFamilyRestroom size="2.5em" /> },
	{ life_aspect: "Vida Social", value: "20", label: <MdGroups size="2.5em" /> },
	{ life_aspect: "Vida Social", value: "21", label: <FaUserFriends size="2.5em" /> },
	
	{ life_aspect: "Vida Profissional", value: "22", label: <ImBriefcase size="2.5em" /> },
	{ life_aspect: "Vida Profissional", value: "23", label: <FaTrophy size="2.5em" /> },
	{ life_aspect: "Vida Profissional", value: "24", label: <GrCertificate size="2.5em" fill="gray" /> },
	{ life_aspect: "Vida Profissional", value: "25", label: <FaGraduationCap size="2.5em" /> }

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