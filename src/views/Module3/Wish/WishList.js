import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delWish, fetchWishes, updateWish } from "../../../store/module3/wishSlice";
import { getAchievementIconFromValue } from "../../auto-conhecimento/form.options";
import { Button, Card, Input, Table, Tooltip } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineSetting } from "react-icons/ai";
import { deleteWish, putWish } from "../../../services/Module3/WishService";
import { toastFeedback } from "../../../utils/actionFeedback";
import { useNavigate } from "react-router-dom";
import WishDialogForm from "./WishDialogForm";
import useResponsive from "../../../utils/hooks/useResponsive";
import { useUserID } from "../../../hooks/useUserID";
import classNames from "classnames";

const { Tr, Td, THead, TBody } = Table;

const WishList = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const wishSlice = useSelector(state => state.module3.wishSlice);
	const { userID } = useUserID();
	const { windowWidth } = useResponsive();
	
	useEffect(() => {
		dispatch(fetchWishes({ user_id: userID }));
	}, []);
	
	const handleDeleteItem = async (itemID) => {
		try {
			await deleteWish(itemID).then(
				() => {
					dispatch(delWish(itemID));
					toastFeedback("warning", "Desejo Excluido");
				}
			);
		} catch (e) {
			toastFeedback("error", "Falha ao Excluir Desejo");
		}
	};
	
	const handleConfigureItem = (item) => {
		navigate("/goal/form", { state: { wishItem: item } });
	};
	
	
	const ItemRow = ({ item }) => {
		const [editing, setEditing] = useState(false);
		const [value, setValue] = useState(item.value);
		const handleEdit = () => {
			setEditing(true);
		};
		const handleSave = async () => {
			try {
				await putWish(item.id, { value: value }).then(
					response => {
						if (response.status === 200) {
							toastFeedback("success", "Desejo Atualizado!");
							setEditing(false);
						}
					}
				);
			} catch (e) {
				console.log(e);
				toastFeedback("danger", "Falha ao atualizar Desejo!");
			}
		};
		
		const EditableCell = ({ id, value, setValue, isEditing }) => {
			const [inputValue, setInputValue] = useState(value);
			const [editing, setEditing] = useState(isEditing);
			const [className, setClassName] = useState("");
			
			useEffect(() => {
				setValue(value);
			}, [value]);
			
			useEffect(() => {
				if (editing) {
					setClassName("border-blue-500 focus:bg-white");
				} else {
					setClassName("border-transparent bg-transparent font-semibold text-black");
				}
			}, [editing]);
			
			return (
				<Input
					key={id}
					className={classNames(className, 'w-[300px] md:w-full')}
					size="sm"
					value={inputValue}
					disabled={!editing}
					onChange={e => setInputValue(e.target.value)}
					onBlur={() => {
						setValue(inputValue);
					}}
				/>
			);
		};
		
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td className="flex flex-row gap-2 items-center justify-center">
					{getAchievementIconFromValue(item.icon)}
					<EditableCell
						key={item.id}
						initialValue={item.value}
						isEditing={editing}
						value={value}
						setValue={setValue}
					/>
				</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center">
						<Tooltip title="Transformar em Meta">
							<Button
								shape="circle"
								color="blue-500"
								size="sm"
								variant="twoTone"
								icon={<AiOutlineSetting />}
								onClick={() => handleConfigureItem(item)}
							/>
						</Tooltip>
						{editing ? (
							<Button
								shape="circle"
								color="green-500"
								size="sm"
								variant="twoTone"
								icon={<AiOutlineCheck />}
								onClick={handleSave}
							/>
						) : (
							<Tooltip title="Editar Desejo">
								<Button
									shape="circle"
									color="blue-500"
									size="sm"
									variant="twoTone"
									icon={<AiOutlineEdit />}
									onClick={handleEdit}
								/>
							</Tooltip>
						)}
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => handleDeleteItem(item.id)}
						/>
					</div>
				</Td>
			</Tr>
		);
	};
	
	const headerExtraContent = (
		<span className="flex items-center">
			<WishDialogForm userID={userID} />
        </span>
	);
	
	return (
		<Card header="Meus Desejos"
		      bodyClass="max-h-[700px] overflow-y-auto"
		      headerClass="bg-[#FFBF29] rounded-t-lg"
		      headerExtra={headerExtraContent}
		>
			<Table>
				<THead style={{ textAlign: "center" }}>
					<Tr>
						<Td>
							<h6>Desejo</h6>
						</Td>
						<Td>
							<h6>Ações</h6>
						</Td>
					</Tr>
				</THead>
				<TBody>
					{!wishSlice.loading && wishSlice.wishes
						? wishSlice.wishes.map((item) => (
							<ItemRow item={item} key={item.id} />
						))
						: null}
				</TBody>
			</Table>
		</Card>
	);
};

export default WishList;
