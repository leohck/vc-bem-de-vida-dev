import React, { useEffect, useState } from "react";
import { Button, Dialog, Input, Select } from "components/ui";
import { FaPlusSquare } from "react-icons/fa";
import {
	aptidoesOptions,
	conquistasOptions
} from "../../../views/auto-conhecimento/form.options";
import { postItem } from "../../../services/PersonalService";
import CreatableSelect from "react-select/creatable";
import { useDispatch } from "react-redux";
import { addSkill } from "../../../store/userinfo/skillsSlice";
import { addAchievement } from "../../../store/userinfo/achievementSlice";
import { LIFE_ASPECTS_OPTIONS } from "../../../constants/aspects.constant";

const DialogForm = (props) => {
	const { itemType, userId, buttonTitle, itemList } = props;

	const dispatch = useDispatch();
	const [dialogIsOpen, setIsOpen] = useState(false);
	const [newItem, setNewItem] = useState([]);
	const [options, setOptions] = useState([]);
	const [newAchievementValue, setNewAchievementValue] = useState();
	const [newAchievementLifeAspect, setNewAchievementLifeAspect] = useState();
	const [newAchievementIcon, setNewAchievementIcon] = useState();
	const [newAchievementYear, setNewAchievementYear] = useState();


	useEffect(() => {
		if (itemType === "skills") {
			const newList = aptidoesOptions.filter(ad =>
				itemList.every(fd => fd.value !== ad.label)
			);
			setOptions(newList);
		} else {
			setOptions(conquistasOptions)
		}
	}, [itemList]);

	const openDialog = () => {
		setIsOpen(true);
	};

	const onDialogClose = () => {
		setIsOpen(false);
	};

	const onDialogOk = () => {
		setIsOpen(false);
		if (itemType === "skills"){
			addItem(userId, newItem);
		} else {
			const data = {
				value: newAchievementValue,
				life_aspect: newAchievementLifeAspect.value,
				icon: newAchievementIcon.value,
				year: newAchievementYear
			}
			console.log(data);
			addItem(userId, data);
		}
	};

	const addItem = (id, value) => {
		const update = async () => {
			try {
				if (itemType === "skills") {
					for (const item of value) {
						const resp = await postItem(itemType, {
							user: id,
							value: item.label
						});
						if (resp.data) {
							dispatch(addSkill(resp.data));
							alert("Sucesso!");
						}
					}
				} else {
					const resp = await postItem(itemType, {
						user: id,
						value: value.value,
						life_aspect: value.life_aspect,
						icon: value.icon,
						year: value.year
					});
					if (resp.data) {
						dispatch(addAchievement(resp.data));
						alert("Sucesso!");
					}
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		update();
	};

	return (
		<div>
			<Button
				className="mr-2"
				variant="twoTone"
				icon={<FaPlusSquare />}
				onClick={() => openDialog()}
			>
				{buttonTitle}
			</Button>
			<Dialog
				isOpen={dialogIsOpen}
				onClose={onDialogClose}
				onRequestClose={onDialogClose}
				shouldCloseOnOverlayClick={false}
			>
				<div>
					{itemType === "skills" ? (
						<>
							<h5 className="mb-4">Cadastrar Nova Habilidade</h5>
							<span>Lista de Habilidades</span>
							<Select
								isClearable={true}
								isMulti={true}
								placeholder="Lista de Aptidões"
								options={options}
								onChange={(e) => setNewItem(e)}
								componentAs={CreatableSelect}
							/>
						</>
					) : (
						<>
							<h5 className="mb-4">Cadastrar Nova Conquista</h5>
							<div className="flex flex-col gap-4">
								<Input placeholder="Descrição"
								       onChange={(e) => setNewAchievementValue(e.target.value)}
								/>
								<Select placeholder="Aspecto de Vida"
								        isClearable={true}
								        options={LIFE_ASPECTS_OPTIONS}
								        onChange={(e) => setNewAchievementLifeAspect(e)}
								/>
								<Select placeholder="Icone"
								        isSearchable={false}
								        isClearable={true}
								        options={options}
								        onChange={(e) => setNewAchievementIcon(e)}
								/>
								<Input placeholder="Ano da Conquista"
								       type="text"
								       maxLength={4}
								       onKeyPress={(event) => {
									       if (!/[0-9]/.test(event.key)) {
										       event.preventDefault();
									       }
								       }}
								       onChange={(e) => setNewAchievementYear(e.target.value)}
								/>
							</div>
						</>
					)}
				</div>
				<div className="text-right mt-6">
					<Button
						className="rtl:ml-2"
						variant="plain"
						onClick={onDialogClose}
					>
						Cancelar
					</Button>
					<Button variant="solid" onClick={onDialogOk}>
						Salvar
					</Button>
				</div>
			</Dialog>
		</div>
	);
};

export default DialogForm;
