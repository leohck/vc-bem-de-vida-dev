import React, { useEffect, useState } from "react";
import { fetchSkills } from "../../store/userinfo/skillsSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { Button, Card, Table } from "../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteItem } from "../../services/PersonalService";
import { deleteSkill } from "../../store/userinfo/skillsSlice";
import DialogForm from "../../components/new/Skills";

const { Tr, Td, THead, TBody } = Table;

function SkillList() {
	const dispatch = useDispatch();
	const skills = useSelector(state => state.userinfo.skillSlice);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const { auth } = store.getState();
		const user_id = auth.user.user_info_id;
		setUserId(user_id);
		dispatch(fetchSkills({ user_id: user_id }));
	}, []);

	const delSkill = (id) => {
		const del = async () => {
			try {
				const resp = await deleteItem("skills", id);
				if (resp.status === 204) {
					dispatch(deleteSkill(id));
					alert("Sucesso");
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		del();
	};

	const ItemRow = ({ item }) => {
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td>{item.value}</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center">
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => delSkill(item.id)}
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

	const headerExtraContent = (
		<span className="flex items-center">
			<DialogForm
				itemType="skills"
				buttonTitle="Nova Habilidade"
				itemList={skills.skills}
				userId={userId}
			/>
        </span>
	);

	return (
		<Card header="Minhas Habilidades"
		      className="w-[600px] h-full overflow-y-auto"
		      headerExtra={headerExtraContent}
		>
			<Table>
				<THead style={{ textAlign: "center" }}>
					<Tr>
						<Td>
							<h6>Habilidade</h6>
						</Td>
						<Td>
							<h6>Ações</h6>
						</Td>
					</Tr>
				</THead>
				<TBody>
					{!skills.loading && skills.skills
						? skills.skills.map(item => (
							<ItemRow item={item} key={item.id} />
						))
						: null
					}
				</TBody>
			</Table>
		</Card>
	);
}

export default SkillList;
