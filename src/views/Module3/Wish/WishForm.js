import React, { useEffect, useState } from "react";
import { Button, Card, Input, Select } from "../../../components/ui";
import { conquistasOptions, getAchievementFromValue } from "../../auto-conhecimento/form.options";
import { useDispatch } from "react-redux";
import { addWish, updateWish } from "../../../store/module3/wishSlice";
import { toastFeedback } from "../../../utils/actionFeedback";

const WishForm = ({ itemToEdit, setItemToEdit }) => {
	const dispatch = useDispatch();
	const [wish, setWish] = useState();
	const [icon, setIcon] = useState();

	const [cardTitle, setCardTitle] = useState( "Cadastrar Novo");

	useEffect(() => {
		if (itemToEdit) {
			setCardTitle("Alterar")
			setWish(itemToEdit.value);
			setIcon(getAchievementFromValue(itemToEdit.icon));
		} else {
			setCardTitle("Cadastrar Novo")
		}
	}, [itemToEdit]);

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const clearForm = () => {
		setWish(null);
		setIcon(null);
	};

	const handleFormSubmit = () => {
		try {
			const data = {
				id: getRandomInt(20),
				value: wish,
				icon: icon.value
			};
			if (itemToEdit) {
				dispatch(updateWish(data));
				toastFeedback("info", "Desejo Alterado");
				setItemToEdit(null);
			} else {
				dispatch(addWish(data));
				toastFeedback("success", "Desejo Cadastrado");
			}
			clearForm();
		} catch (e) {
			console.log(e);
			toastFeedback("danger", "Falha ao Cadastrar Desejo - Preencha todos os campos do formulario");
		}
	};

	return (
		<Card header={cardTitle + " Desejo"}
		      bodyClass="flex flex-row gap-4">
			<Input
				className="max-w-[400px]"
				placeholder="Desejo"
				value={wish}
				onChange={e => setWish(e.target.value)}
			/>
			<Select placeholder="Icone"
			        className="max-w-[100px] h-10"
			        isSearchable={false}
			        options={conquistasOptions}
			        value={icon}
			        onChange={(e) => setIcon(e)}
			/>
			<Button variant="solid" onClick={handleFormSubmit}>
				Salvar
			</Button>
		</Card>
	);
};

export default WishForm;
