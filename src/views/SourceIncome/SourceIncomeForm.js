import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Input, Segment, Tooltip } from "../../components/ui";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
	addNewSourceIncome,
	updateSourceIncome
} from "../../store/userinfo/sourceIncomeSlice";
import { getSourceIncome, postSourceIncome } from "../../services/SourceIncomeService";
import { useUserID } from "../../hooks/useUserID";
import BrlCurrencyComponent from "../../components/new/InputBrCurrency";
import { GrFormRefresh } from "react-icons/gr";
import { toastFeedback } from "../../utils/actionFeedback";


const SourceIncomeForm = (props) => {
	const { itemID, setItemID, formTitle, setFormTitle } = props;
	
	const dispatch = useDispatch();
	const [incomeFrom, setIncomeFrom] = useState();
	const [incomeType, setIncomeType] = useState();
	const [incomeValue, setIncomeValue] = useState();
	const { userID } = useUserID();
	const [user_info_id, setUserId] = useState(userID);
	
	
	const cleanForm = () => {
		setFormTitle('Cadastrar')
		setIncomeFrom(null);
		setIncomeType(null);
		setIncomeValue(null);
		setItemID(null);
	};
	
	useEffect(() => {
		const get_sc = async () => {
			if (itemID) {
				await getSourceIncome(itemID).then(
					response => {
						setIncomeFrom(response.data.income_from);
						setIncomeType([response.data.income_type]);
						setIncomeValue(response.data.income);
					}
				);
			}
		};
		get_sc();
	}, [itemID]);
	
	const handleIncomeTypeChange = useCallback((val) => {
		setIncomeType(val);
	}, []);
	
	const saveNewSourceIncome = (data) => {
		const update = async () => {
			try {
				const resp = await postSourceIncome(data, itemID);
				if (resp.data) {
					console.log(resp.data);
					if (itemID) {
						dispatch(updateSourceIncome(resp.data));
					} else {
						dispatch(addNewSourceIncome(resp.data));
					}
					toastFeedback('success', 'Renda Mensal Atualizada')
					setFormTitle("Cadastrar");
					cleanForm();
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
			income: incomeValue,
			income_from: incomeFrom,
			income_type: incomeType[0]
		};
		saveNewSourceIncome(data);
	};
	
	const headerExtraContent = (
		<span className="flex items-center">
			<Tooltip title="Limpar Formulario">
	            <Button
		            shape="circle"
		            color="blue-500"
		            size="sm"
		            variant="twoTone"
		            icon={<GrFormRefresh />}
		            onClick={() => {
			            cleanForm();
		            }}
	            />
			</Tooltip>
        </span>
	);
	
	return (
		<Card header={`${formTitle} Renda Mensal`}
		      headerClass="bg-[#FFBF29] rounded-t-lg"
		      headerExtra={headerExtraContent}>
			<div className="flex flex-row gap-4">
				<Input
					value={incomeFrom}
					onChange={(e) => {
						setIncomeFrom(e.target.value);
					}}
					name="income_from"
					className="max-w-[400px]"
					placeholder="Tipo de Renda"
					suffix={
						<Tooltip title="Aluguel, Freelancer, CLT">
							<HiOutlineExclamationCircle className="text-lg cursor-pointer ml-1" />
						</Tooltip>
					}
				/>
				<Segment value={incomeType} onChange={handleIncomeTypeChange}>
					<Segment.Item value="ativa">Ativa</Segment.Item>
					<Segment.Item value="passiva">Passiva</Segment.Item>
					<Segment.Item value="compartilhada">
						Compartilhada
					</Segment.Item>
				</Segment>
				<BrlCurrencyComponent
					value={incomeValue}
					onChange={setIncomeValue}
					name="income"
					className="max-w-[400px]"
					placeholder="Renda Líquida Mensal"
					prefix="R$"
				/>
				<Button variant="solid" onClick={handleFormSubmit}>
					Salvar
				</Button>
			</div>
		</Card>
	);
};

export default SourceIncomeForm;
