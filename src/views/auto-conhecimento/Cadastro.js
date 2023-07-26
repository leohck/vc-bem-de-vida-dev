import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, Card, DatePicker, Input, Segment } from "components/ui";
import { HiOutlineUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../store/userinfo/userInfoSlice";
import { putUserInfo } from "../../services/PersonalService";
import { setCurrentUser } from "../../store/userinfo/userInfoSlice";
import store from "../../store";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { toastFeedback } from "../../utils/actionFeedback";

const Cadastro = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfoLoaded = useRef(false);
	const user_info = useSelector((state) => state.userinfo.userInfoState);
	const [user_info_id, setUserInfoID] = useState(null);
	const [maritalStatus, setMaritalStatus] = useState([]);
	const [birthdate, setBirthdate] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	
	
	useEffect(() => {
		if (!userInfoLoaded.current) {
			const { auth } = store.getState();
			const user_id = auth.user.user_info_id;
			dispatch(fetchUserInfo({ user_info_id: user_id }));
		}
		if (!user_info.loading && user_info.currentUser) {
			setUserInfoID(user_info.currentUser.id);
			setName(user_info.currentUser.name);
			const date = new Date(user_info.currentUser.birthdate + " EDT");
			const birth = date.toLocaleDateString("pt-BR");
			setBirthdate(birth);
			setMaritalStatus([user_info.currentUser.marital_status]);
			setEmail(user_info.currentUser.email);
			
			return () => {
				userInfoLoaded.current = true;
			};
		}
	}, [user_info]);
	
	const saveUserInfo = async (data) => {
		try {
			const resp = await putUserInfo(user_info_id, data);
			if (resp.data) {
				dispatch(setCurrentUser(data));
				toastFeedback("success", "Informações Atualizadas");
				navigate("dashboard", { replace: true });
			}
		} catch (errors) {
			toastFeedback("danger", "Erro ao Atualizar Informações");
			console.log(errors);
		}
	};
	
	const handleFormSubmit = async () => {
		
		const data = {
			id: user_info_id,
			name: name,
			birthdate: birthdate,
			marital_status: maritalStatus[0],
			email: email
		};
		const customParseFormat = require("dayjs/plugin/customParseFormat");
		dayjs.extend(customParseFormat);
		if (typeof birthdate !== "string") {
			data.birthdate = birthdate.toISOString().split("T")[0];
		} else {
			data.birthdate = dayjs(data.birthdate, "DD/MM/YYYY", "pt-br").toISOString().split("T")[0];
		}
		await saveUserInfo(data);
	};
	
	const handleMaritalStatusChange = useCallback((val) => {
		setMaritalStatus(val);
	}, []);
	
	return (
		<div>
			<div className="mb-8 grid justify-items-center">
				<h2>Cadastro Inicial</h2>
			</div>
			
			<Card
				bodyClass="flex flex-col gap-4 md:max-w-[600px]"
				footer={
					<div className="flex justify-items-end">
						<Button
							size="sm"
							variant="solid"
							onClick={handleFormSubmit}
						>
							Salvar
						</Button>
					</div>
				}
			>
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					<p className="font-bold text-lg">Nome</p>
					<Input
						className=""
						name="name"
						value={name}
						prefix={<HiOutlineUser className="text-lg" />}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					<p className="font-bold text-lg mr-6">Data de Nascimento</p>
					<DatePicker
						value={birthdate}
						onChange={setBirthdate}
						locale="pt-br"
						inputFormat="DD/MM/YYYY"
						labelFormat={{
							month: "MMMM",
							year: "YYYY"
						}}
						placeholder={birthdate}
					/>
				</div>
				
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					<p className="font-bold text-lg">Estado Civil</p>
					<Segment
						onChange={handleMaritalStatusChange}
						value={maritalStatus}
					>
						<Segment.Item value="Solteiro">Solteiro</Segment.Item>
						<Segment.Item
							className="py-0 px-0"
							value="Uniao Estavel">
							União Estável
						</Segment.Item>
						<Segment.Item value="Casado">Casado</Segment.Item>
						<Segment.Item value="Viuvo">Viuvo</Segment.Item>
					</Segment>
				</div>
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					<p className="font-bold text-lg">Email: </p>
					<Input
						className=""
						name="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</div>
			</Card>
		</div>
	);
};

export default Cadastro;
