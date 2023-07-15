import React, { useEffect, useState } from "react";
import { fetchSkills } from "../../store/userinfo/skillsSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { Button, Card, Input, Table } from "../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { deleteItem } from "../../services/PersonalService";
import { deleteSkill } from "../../store/userinfo/skillsSlice";
import DialogForm from "../../components/new/Skills";
import { updateSkill } from "../../services/SkillService";
import { toastFeedback } from "../../utils/actionFeedback";

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
					toastFeedback('warning', 'Habilidade Excluida')
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		del();
	};

	const ItemRow = ({ item }) => {
		const [editing, setEditing] = useState(false);
		const [value, setValue] = useState(item.value);
		const handleEdit = () => {
			setEditing(true);
		};

		const handleSave = async () => {
			try {
				await updateSkill(item.id, value).then(
					response => {
						console.log(response);
						if (response.status === 200) {
							toastFeedback('success', 'Habilidade Atualizada')
							setEditing(false);
						}
					}
				)
			} catch (e) {
				console.log(e);
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
					setClassName("border-transparent bg-transparent");
				}
			}, [editing]);

			return (
				<Input
					key={id}
					className={className}
					size="sm"
					value={inputValue}
					disabled={!editing}
					onChange={e => setInputValue(e.target.value)}
					onBlur={() => {setValue(inputValue)}}
				/>
			);
		};

		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td>
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
							<Button
								shape="circle"
								color="blue-500"
								size="sm"
								variant="twoTone"
								icon={<AiOutlineEdit />}
								onClick={handleEdit}
							/>
						)}
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => delSkill(item.id)}
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
		      headerClass="bg-[#FFBF29] rounded-t-lg"
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
