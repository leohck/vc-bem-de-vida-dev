import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delWish, fetchWishes } from "../../../store/module3/wishSlice";
import { getAchievementIconFromValue } from "../../auto-conhecimento/form.options";
import { Button, Card, Table } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteWish } from "../../../services/Module3/WishService";
import { toastFeedback } from "../../../utils/actionFeedback";

const { Tr, Td, THead, TBody } = Table;

const WishList = ({ userID, setItemToEdit }) => {
	const dispatch = useDispatch();
	const wishSlice = useSelector(state => state.module3.wishSlice);

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

	const handleEditItem = (item) => {
		setItemToEdit(item);
	};

	const ItemRow = ({ item }) => {
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td className="flex flex-row justify-center">
					<div className="flex flex-row gap-2 items-center">
						{getAchievementIconFromValue(item.icon)}
						{item.value}
					</div>
				</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center">
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => handleDeleteItem(item.id)}
						/>

						<Button
							shape="circle"
							color="blue-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineEdit />}
							onClick={() => handleEditItem(item)}
						/>
					</div>
				</Td>
			</Tr>
		);
	};

	return (
		<Card header="Meus Desejos"
		      className="max-h-[700px] overflow-y-auto"
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
