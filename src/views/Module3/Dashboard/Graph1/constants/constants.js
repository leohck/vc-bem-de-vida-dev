import { GiHealthNormal } from "react-icons/gi";
import { RiCoinsLine, RiMentalHealthFill } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

export const LIFE_ASPECTS_OPTIONS = [
	{
		label: 'Saúde Física',
		value: 'Saude Fisica',
		icon: <GiHealthNormal size="3em"/>,
	},
	{
		label: 'Saúde Mental',
		value: 'Saude Mental',
		icon: <RiMentalHealthFill size="3em" />,
	},
	{
		label: 'Vida Social',
		value: 'Vida Social',
		icon: <MdGroups size="3em" />,
	},
	{
		label: 'Vida Profissional',
		value: 'Vida Profissional',
		icon: <FaHandshake size="3em" />,
	},
	{
		label: 'Gestão Financeira',
		value: 'Gestao Financeira',
		icon: <RiCoinsLine size="3em" />,
	},
]

export const getLifeAspectIconFromValue = (value) => {
	return LIFE_ASPECTS_OPTIONS.filter(option => option.value === value)[0].icon;
}

export const LIFE_ASPECT_COLOR_NOT_RATED = 'gray-700'
export const LIFE_ASPECT_COLOR_VERY_LOW = 'red-500'
export const LIFE_ASPECT_COLOR_LOW = 'orange-500'
export const LIFE_ASPECT_COLOR_REGULAR = 'yellow-500'
export const LIFE_ASPECT_COLOR_HIGH = 'green-500'
export const LIFE_ASPECT_COLOR_VERY_HIGH = 'emerald-700'

export const getLifeAspectRatingColor = (aspectRating) => {
	switch (aspectRating) {
		case 1:
			return LIFE_ASPECT_COLOR_VERY_LOW;
		case 2:
			return LIFE_ASPECT_COLOR_LOW;
		case 3:
			return LIFE_ASPECT_COLOR_REGULAR;
		case 4:
			return LIFE_ASPECT_COLOR_HIGH;
		case 5:
			return LIFE_ASPECT_COLOR_VERY_HIGH;
		default:
			return LIFE_ASPECT_COLOR_NOT_RATED;
	}
};

export const getLifeAspectRatingBgColor = (aspectRating) => {
	switch (aspectRating) {
		case 1:
			return 'red';
		case 2:
			return 'orange';
		case 3:
			return 'yellow';
		case 4:
			return 'green';
		case 5:
			return 'emerald';
		default:
			return 'gray';
	}
};

export const lifeAspectOptions = [
	{ value: "all", label: "Todos" },
	{ value: "Saude Fisica", label: "Saude Fisica" },
	{ value: "Saude Mental", label: "Saude Mental" },
	{ value: "Vida Social", label: "Vida Social" },
	{ value: "Vida Profissional", label: "Vida Profissional" },
	{ value: "Gestao Financeira", label: "Gestão Financeira" }
];