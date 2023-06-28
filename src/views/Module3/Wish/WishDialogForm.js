import React, { useState } from "react";
import { Button, Dialog, Input, Select } from "components/ui";
import { FaPlusSquare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { postWish } from "../../../services/Module3/WishService";
import { addWish } from "../../../store/module3/wishSlice";
import { toastFeedback } from "../../../utils/actionFeedback";
import { conquistasOptions } from "../../auto-conhecimento/form.options";

const WishForm = (props) => {
	const {
		wish,
		setWish,
		icon,
		setIcon
	} = props;
	return (
		<div className="flex flex-row gap-2">
			<Input
				className="max-w-[400px] w-[300px]"
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
		</div>
	);
};

const WishDialogForm = ({userID}) => {
	const dispatch = useDispatch();

	const [dialogIsOpen, setIsOpen] = useState(false);
	const [wish, setWish] = useState();
	const [icon, setIcon] = useState();

	const openDialog = () => {
		setIsOpen(true);
	};

	const onDialogClose = (e) => {
		setIsOpen(false);
	};

	const onDialogOk = (e) => {

		try {
			handleFormSubmit();
			setIsOpen(false);
		} catch (e) {
			return;
		}
	};

	const handleFormSubmit = async () => {
		try {
			const data = {
				user: userID,
				value: wish,
				icon: icon.value
			};
			try {
				await postWish(data).then(
					response => {
						dispatch(addWish(response.data));
						toastFeedback("success", "Desejo Cadastrado");
					}
				);
			} catch (e) {
				console.log(e);
				toastFeedback("danger", "Falha ao Cadastrar Desejo");
			}
		} catch (e) {
			console.log(e);
			toastFeedback("danger", "Falha ao Cadastrar Desejo - Preencha todos os campos do formulario");
		}
	};

	return (
		<div>
			<Button
				className="mr-2"
				variant="twoTone"
				icon={<FaPlusSquare />}
				onClick={() => openDialog()}
			>
				Novo Desejo
			</Button>
			<Dialog
				isOpen={dialogIsOpen}
				onClose={onDialogClose}
				onRequestClose={onDialogClose}
				bodyOpenClassName="overflow-hidden"
			>
				<h5 className="mb-4">Cadastrar Desejo</h5>
				<WishForm
					wish={wish}
					setWish={setWish}
					icon={icon}
					setIcon={setIcon}
				/>
				<div className="text-right mt-6">
					<Button
						className="ltr:mr-2 rtl:ml-2"
						variant="plain"
						onClick={onDialogClose}
					>
						Cancel
					</Button>
					<Button variant="solid" onClick={onDialogOk}>
						Salvar
					</Button>
				</div>
			</Dialog>
		</div>
	);
};

export default WishDialogForm;

