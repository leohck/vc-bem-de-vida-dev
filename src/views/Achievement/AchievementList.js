import React, { useEffect, useState } from "react";
import { fetchAchievements } from "../../store/userinfo/achievementSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { Button, Card, Table } from "../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { deleteItem } from "../../services/PersonalService";
import { deleteAchievement } from "../../store/userinfo/achievementSlice";
import DialogForm from "../../components/new/Skills";
import { getAchievementIconFromValue } from "../auto-conhecimento/form.options";
import { toastFeedback } from "../../utils/actionFeedback";
import { getLifeAspectLabelFromValue } from "../../constants/aspects.constant";

const { Tr, Td, THead, TBody } = Table;

function AchievementList() {
	const dispatch = useDispatch();
	const achievements = useSelector(state => state.userinfo.achievementSlice);
	const [userId, setUserId] = useState(null);
	
	useEffect(() => {
		const { auth } = store.getState();
		const user_id = auth.user.user_info_id;
		setUserId(user_id);
		dispatch(fetchAchievements({ user_id: user_id }));
	}, []);
	
	const delAchievement = (id) => {
		const del = async () => {
			try {
				const resp = await deleteItem("achievements", id);
				if (resp.status === 204) {
					dispatch(deleteAchievement(id));
					toastFeedback("warning", "Conquista Excluida");
				}
			} catch (errors) {
				console.log(errors);
				toastFeedback("warning", "Erro ao Excluir Conquista");
			}
		};
		del();
	};
	
	const ItemRow = ({ item }) => {
		const itemData = {
			value: item.value,
			life_aspect: item.life_aspect,
			icon: item.icon,
			year: item.year
		};
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td className="max-w-[250px]">
					<div className="flex flex-row gap-2 items-center">
						{getAchievementIconFromValue(item.icon)}
						{item.value}
					</div>
				</Td>
				<Td>{getLifeAspectLabelFromValue(item.life_aspect)}</Td>
				<Td>{item.year}</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center">
						<DialogForm
							itemType="achievements"
							buttonType="edit"
							userId={userId}
							itemID={item.id}
							itemData={itemData}
						/>
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => delAchievement(item.id)}
						/>
					</div>
				</Td>
			</Tr>
		);
	};
	
	const headerExtraContent = (
		<span className="flex items-center">
            <DialogForm
	            itemType="achievements"
	            buttonTitle="Nova Conquista"
	            userId={userId}
            />
        </span>
	);
	
	return (
		<Card header="Minhas Conquistas"
		      className="overflow-y-auto"
		      headerClass="bg-[#FFBF29] rounded-t-lg"
		      headerExtra={headerExtraContent}
		>
			<Table>
				<THead style={{ textAlign: "center" }}>
					<Tr>
						<Td>
							<h6>Conquista</h6>
						</Td>
						<Td>
							<h6>Aspecto de Vida</h6>
						</Td>
						<Td>
							<h6>Ano da Conquista</h6>
						</Td>
						<Td>
							<h6>Ações</h6>
						</Td>
					</Tr>
				</THead>
				<TBody>
					{!achievements.loading && achievements.achievements
						? achievements.achievements.map(item => (
							<ItemRow item={item} key={item.id} />
						))
						: null
					}
				</TBody>
			</Table>
		</Card>
	);
}

export default AchievementList;
