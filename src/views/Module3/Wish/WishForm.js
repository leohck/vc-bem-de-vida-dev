import React, { useEffect, useState } from "react";
import { Button, Card, Input, Select } from "../../../components/ui";
import { conquistasOptions, getAchievementFromValue } from "../../auto-conhecimento/form.options";
import { useDispatch } from "react-redux";
import { addWish, updateWish } from "../../../store/module3/wishSlice";
import { toastFeedback } from "../../../utils/actionFeedback";
import { putWish, postWish } from "../../../services/Module3/WishService";

const WishForm = ({ userID, itemToEdit, setItemToEdit }) => {
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

	const clearForm = () => {
		setWish(null);
		setIcon(null);
	};

	const handleFormSubmit = async () => {
		try {
			const data = {
				user: userID,
				value: wish,
				icon: icon.value
			};
			if (itemToEdit) {
				try {
					await putWish(itemToEdit.id, data).then(
						response => {
							dispatch(updateWish(response.data));
							toastFeedback("info", "Desejo Alterado");
							setItemToEdit(null);
						}
					)
				} catch (e) {
					console.log(e);
					toastFeedback("danger", "Falha ao Editar Desejo");
				}
			} else {
				try {
					await postWish(data).then(
						response => {
							dispatch(addWish(response.data));
							toastFeedback("success", "Desejo Cadastrado");
						}
					)
				} catch (e) {
					console.log(e);
					toastFeedback("danger", "Falha ao Cadastrar Desejo")
				}
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
