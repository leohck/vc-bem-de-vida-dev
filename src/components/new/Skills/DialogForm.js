import React, { useEffect, useState } from "react";
import { Button, Dialog, Select } from "components/ui";
import { FaPlusSquare } from "react-icons/fa";
import {
	aptidoesOptions,
	conquistasGroupedOptions
} from "../../../views/auto-conhecimento/form.options";
import { postItem } from "../../../services/PersonalService";
import CreatableSelect from "react-select/creatable";
import { HiCheck } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addSkill } from "../../../store/userinfo/skillsSlice";
import { addAchievement } from "../../../store/userinfo/achievementSlice";
import { components } from "react-select";

const { MultiValueLabel } = components;

const DialogForm = (props) => {
	const dispatch = useDispatch();
	const [dialogIsOpen, setIsOpen] = useState(false);
	const [newItem, setNewItem] = useState("");
	const [options, setOptions] = useState([]);
	const { itemType, userId, buttonTitle, itemList } = props;


	useEffect(() => {
		if (itemType === "skills") {
			const newList = aptidoesOptions.filter(ad =>
				itemList.every(fd => fd.value !== ad.label)
			);
			setOptions(newList);
		} else {
			const newList = conquistasGroupedOptions.filter(ad =>
				itemList.every(fd => fd.value !== ad.label)
			);
			setOptions(newList);
		}
	}, [itemList]);

	const openDialog = () => {
		setIsOpen(true);
	};

	const onDialogClose = (e) => {
		setIsOpen(false);
	};

	const onDialogOk = (e) => {
		setIsOpen(false);
		addItem(userId, newItem);
	};

	const addItem = (id, value) => {
		const update = async () => {
			try {
				if (itemType === "skills") {
					const resp = await postItem(itemType, {
						user: id,
						value: value
					});
					if (resp.data) {
						alert("Sucesso!");
						dispatch(addSkill(resp.data));
					}
				} else {
					for (const item of value) {
						const resp = await postItem(itemType, {
							user: id,
							value: item.label,
							life_aspect: item.life_aspect,
							icon: null
						});
						if (resp.data) {
							dispatch(addAchievement(resp.data));
							alert("Sucesso!");
						}
					}
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		update();
	};

	const CustomControlMulti = ({ children, data, ...props }) => {
		const { icon } = data;
		return (
			<MultiValueLabel {...props}>
				<div className="inline-flex items-center">
					{icon} &nbsp;
					{children}
				</div>
			</MultiValueLabel>
		);
	};
	const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
		return (
			<div
				className={`flex items-center justify-between p-2 ${
					isSelected
						? "bg-gray-100 dark:bg-gray-500"
						: "hover:bg-gray-50 dark:hover:bg-gray-600"
				}`}
				{...innerProps}
			>
				<div className="flex items-center">
					{data.icon}
					<span className="ml-2 rtl:mr-2">{label}</span>
				</div>
				{isSelected && <HiCheck className="text-emerald-500 text-xl" />}
			</div>
		);
	};
	const formatGroupLabel = (data) => (
		<div className="font-bold text-xs uppercase text-gray-800 dark:text-white my-2">
			{data.label}
		</div>
	);

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
			>
				<div>
					{itemType === "skills" ? (
						<>
							<h5 className="mb-4">Cadastrar Nova Habilidade</h5>
							<span>Lista de Habilidades</span>
							<Select
								isClearable={false}
								isMulti={false}
								placeholder="Lista de Aptidões"
								options={options}
								onChange={({ label }) => setNewItem(label)}
								componentAs={CreatableSelect}
							/>
						</>
					) : (
						<>
							<h5 className="mb-4">Cadastrar Nova Conquista</h5>
							<span>Lista de Conquistas</span>
							<Select
								isMulti
								placeholder="Lista de Conquistas"
								options={options}
								onChange={(e) => setNewItem(e)}
								components={{
									Option: CustomSelectOption,
									MultiValueLabel: CustomControlMulti
								}}
								formatGroupLabel={formatGroupLabel}
								className="mb-4"
							/>
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
