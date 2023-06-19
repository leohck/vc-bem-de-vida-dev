import React, { useEffect } from "react";
import { fetchAchievements } from "../../store/userinfo/achievementSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { Button, Card, Table } from "../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

const { Tr, Td, THead, TBody } = Table;

function AchievementList() {
	const dispatch = useDispatch();
	const achievements = useSelector(state => state.userinfo.achievementSlice);

	useEffect(() => {
		const { auth } = store.getState();
		const user_id = auth.user.user_info_id;
		dispatch(fetchAchievements({ user_id: user_id }));
	}, []);

	const ItemRow = ({ item }) => {
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td>{item.value}</Td>
				<Td>{item.life_aspect}</Td>
				<Td>{item.icon}</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center">
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							// onClick={() => delSourceIncome(item.id)}
						/>

						<Button
							shape="circle"
							color="blue-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineEdit />}
							// onClick={() => {
							// 	setItemID(item.id);
							// }}
						/>
					</div>
				</Td>
			</Tr>
		);
	};

	return (
		<Card header="Minhas Conquistas">
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
							<h6>Icone</h6>
						</Td>
						<Td>
							<h6>Ações</h6>
						</Td>
					</Tr>
				</THead>
				<TBody>
					{!achievements.loading && achievements.achievements
						? achievements.achievements.map(item => (
							<ItemRow item={item} key={item.id}/>
						))
						: null
					}
				</TBody>
			</Table>
		</Card>
	);
}

export default AchievementList;
