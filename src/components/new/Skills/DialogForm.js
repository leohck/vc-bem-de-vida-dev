import React, { useEffect, useState } from "react";
import { Button, Dialog, Input, Select } from "components/ui";
import { FaPlusSquare } from "react-icons/fa";
import {
	aptidoesOptions,
	conquistasOptions, getAchievementFromValue
} from "../../../views/auto-conhecimento/form.options";
import { postItem } from "../../../services/PersonalService";
import CreatableSelect from "react-select/creatable";
import { useDispatch } from "react-redux";
import { addSkill } from "../../../store/userinfo/skillsSlice";
import { addAchievement, putAchievement } from "../../../store/userinfo/achievementSlice";
import {
	getLifeAspectFromValue,
	LIFE_ASPECTS_OPTIONS
} from "../../../constants/aspects.constant";
import { AiOutlineEdit } from "react-icons/ai";
import { updateAchievement } from "../../../services/AchievementService";

const DialogForm = (props) => {
	const {
		itemType,
		userId,
		buttonTitle,
		buttonType,
		itemList,
		itemID = null,
		itemData = null
	} = props;

	const dispatch = useDispatch();
	const [dialogIsOpen, setIsOpen] = useState(false);
	const [newItem, setNewItem] = useState([]);
	const [options, setOptions] = useState([]);
	const [newAchievementValue, setNewAchievementValue] = useState();
	const [newAchievementLifeAspect, setNewAchievementLifeAspect] = useState();
	const [newAchievementIcon, setNewAchievementIcon] = useState();
	const [newAchievementYear, setNewAchievementYear] = useState();
	const [dialogTitle, setDialogTitle] = useState("Cadastrar");


	useEffect(() => {
		if (itemType === "skills") {
			const newList = aptidoesOptions.filter(ad =>
				itemList.every(fd => fd.value !== ad.label)
			);
			setOptions(newList);
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
		try {
			if (itemType === "skills") {
				addItem(userId, newItem);
			} else {
				const data = {
					value: newAchievementValue,
					life_aspect: newAchievementLifeAspect.value,
					icon: newAchievementIcon.value,
					year: newAchievementYear
				};
				if (buttonType !== "edit") {
					addItem(userId, data);
				} else {
					updateItem(itemID, data);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleEdit = () => {
		openDialog();
		setDialogTitle("Alterar");
		setNewAchievementValue(itemData.value);
		setNewAchievementYear(itemData.year);
		setNewAchievementLifeAspect(getLifeAspectFromValue(itemData.life_aspect));
		setNewAchievementIcon(getAchievementFromValue(itemData.icon));
	};

	const updateItem = (id, data) => {
		const update = async () => {
			try {
				const resp = await updateAchievement(id, {
					value: data.value,
					life_aspect: data.life_aspect,
					icon: data.icon,
					year: data.year
				});
				if (resp.data) {
					dispatch(putAchievement(resp.data));
					alert("Sucesso!");
				}
			} catch (e) {
				console.log(e);
			}
		};
		update();
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
			{buttonType !== "edit" ? (
				<Button
					className="mr-2"
					variant="twoTone"
					icon={<FaPlusSquare />}
					onClick={() => openDialog()}
				>
					{buttonTitle}
				</Button>
			) : (
				<Button
					shape="circle"
					color="blue-500"
					size="sm"
					variant="twoTone"
					icon={<AiOutlineEdit />}
					onClick={() => handleEdit()}
				/>
			)}

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
							<h5 className="mb-4">{dialogTitle} Nova Conquista</h5>
							<div className="flex flex-col gap-4">
								<Input placeholder="Descrição"
								       value={newAchievementValue}
								       onChange={(e) => setNewAchievementValue(e.target.value)}
								/>
								<Select placeholder="Aspecto de Vida"
								        isClearable={true}
								        options={LIFE_ASPECTS_OPTIONS}
								        value={newAchievementLifeAspect}
								        onChange={(e) => setNewAchievementLifeAspect(e)}
								/>
								<Select placeholder="Icone"
								        isSearchable={false}
								        isClearable={true}
								        options={conquistasOptions}
								        value={newAchievementIcon}
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
								       value={newAchievementYear}
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
