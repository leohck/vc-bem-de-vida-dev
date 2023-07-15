import React, {
	useState,
	useCallback,
	useEffect
} from "react";
import { Input, Button, Card, Switcher } from "components/ui";
import { useDispatch } from "react-redux";
import { addNewPayment } from "store/userinfo/routinePaymentSlice";
import { getRoutinePayment, postRoutinePayment } from "services/RoutinePaymentService";
import { useLocation, useNavigate } from "react-router-dom";
import LifeAspectSegment from "./components/LifeAspectSegment";
import store from "../../store";
import { toastFeedback } from "../../utils/actionFeedback";

const RoutinePaymentForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user_info_id, setUserInfoID] = useState(null);
	const [itemID, setItemID] = useState(null);
	const { state } = useLocation();

	const [paymentValue, setPaymentValue] = useState();
	const [paymentAmount, setPaymentAmount] = useState();

	const [lifeAspect, setLifeAspect] = useState([]);
	const [paymentGenerateMoney, setPaymentGenerateMoney] = useState(false);

	useEffect(() => {
		const { auth } = store.getState();
		const user_id = auth.user.user_info_id;
		setUserInfoID(user_id);
	}, []);

	useEffect(() => {
		try {
			const { itemID } = state;
			setItemID(itemID);
		} catch (e) {
			setItemID(null);
		}
	}, [itemID]);

	useEffect(() => {
		if (itemID) {
			const get_rp = async () => {
				try {
					await getRoutinePayment(itemID).then(
						response => {
							setLifeAspect(response.data.life_aspect.split(","));
							setPaymentGenerateMoney(
								response.data.payment_generate_money
							);
							setPaymentAmount(response.data.monthly_amount_investing);
							setPaymentValue(response.data.value);
						}
					);
				} catch (e) {
					console.log(e);
				}
			};
			get_rp();
		}
	}, [itemID]);

	const handleLifeAspectChange = useCallback((val) => {
		setLifeAspect(val);
	}, []);

	const onSwitcherToggle = (val) => {
		setPaymentGenerateMoney(!val);
	};

	const addNewRoutinePayment = (data) => {
		const update = async () => {
			try {
				const resp = await postRoutinePayment(data, itemID);
				if (resp.data) {
					dispatch(addNewPayment(data));
					toastFeedback('success', 'Pagamento de Rotina Salvo')
					navigate("/routine/payments");
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		update();
	};

	const handleFormSubmit = () => {
		const data = {
			user: user_info_id,
			value: paymentValue,
			life_aspect: lifeAspect.toString(),
			monthly_amount_investing: paymentAmount,
			payment_generate_money: paymentGenerateMoney
		};
		addNewRoutinePayment(data);
	};
	return (
		<div>
			<div className="mb-8 grid justify-items-center">
				<h3>Cadastrar Pagamento de Rotina</h3>
			</div>

			<Card
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
				<div className="flex flex-row items-center">
					<p className="font-bold text-lg">Pagamento de Rotina: </p>
					<Input
						value={paymentValue}
						className="max-w-sm ml-16"
						placeholder="Nome do Pagamento de Rotina"
						name="routine_payment"
						onChange={(e) => {
							setPaymentValue(e.target.value);
						}}
					/>
				</div>

				<div className="flex flex-col justify-items-center mt-10">
					<p className="font-bold text-lg">
						Aspecto de Vida Influenciado pelo Pagamento:{" "}
					</p>
					<LifeAspectSegment
						value={lifeAspect}
						onChange={handleLifeAspectChange}
					/>
				</div>

				<div className="flex flex-row items-center mt-10">
					<p className="font-bold text-lg">
						Qual o valor mensal investido neste pagamento?{" "}
					</p>
					<Input
						value={paymentAmount}
						className="max-w-sm ml-10"
						name="payment_monthly_cost"
						onChange={(e) => {
							setPaymentAmount(e.target.value);
						}}
						type="number"
						prefix="R$"
					/>
				</div>

				<div className="flex flex-row items-center mt-10">
					<p className="font-bold text-lg">
						Este pagamento / investimento gera dinheiro?{" "}
					</p>
					<Switcher
						checked={paymentGenerateMoney}
						name="payment_generate_money"
						color="green-500"
						className="ml-10"
						onChange={onSwitcherToggle}
					/>
				</div>
			</Card>
		</div>
	);
};

export default RoutinePaymentForm;
