import React, { useState, useEffect, useRef } from "react";
import { CustomSelector } from "components/new";
import {
	getAspectTitleQuestions,
	updateAspectRating
} from "../../../services/PersonalService";
import { Button, Card } from "../../ui";
import store from "../../../store";
import { useNavigate } from "react-router-dom";
import { toastFeedback } from "../../../utils/actionFeedback";
import { useUserID } from "../../../hooks/useUserID";
import { getLifeAspectLabelFromValue } from "../../../constants/aspects.constant";

const Circulo = ({ title, icon }) => {
	const navigate = useNavigate();
	const [questions, setQuestionsValue] = useState([]);
	const { userID } = useUserID();
	
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				await getAspectTitleQuestions(userID, title).then(
					response => {
						const { questions } = response.data;
						setQuestionsValue(questions);
					}
				);
			} catch (errors) {
				console.log(errors);
			}
		};
		if (userID) {
			fetchQuestions();
		}
	}, [userID]);
	
	const updateState = (question_id, value) => {
		const newState = questions.map((obj) => {
			if (obj.id === question_id) {
				return { ...obj, rating: value };
			}
			return obj;
		});
		setQuestionsValue(newState);
	};
	
	const updateQuestionRating = async (id, value) => {
		try {
			const resp = await updateAspectRating(id, parseInt(value));
			if (resp.data) {
				updateState(id, value);
			}
		} catch (errors) {
			console.log(errors);
		}
	};
	
	const handleSave = () => {
		questions.map(async question => {
			await updateQuestionRating(question.id, question.rating)
		})
		toastFeedback("success", "Satisfação Pessoal Atualizada");
		navigate("dashboard", { replace: true });
	};
	
	const formatDate = (date) => {
		const dt = new Date(date + " EDT");
		return dt.toLocaleDateString("pt-BR");
	}
	
	return (
		<div>
			<div className="mb-8 grid justify-items-center">
				<div className="flex items-center gap-3">
					{icon}
					<h2>{getLifeAspectLabelFromValue(title)}</h2>
				</div>
			</div>
			<Card
				footer={
					<Button size="sm"
					        variant="solid"
					        onClick={handleSave}
					>
						Salvar
					</Button>
				}
			>
				{questions.map((question, index) => (
					<div key={index} className="flex flex-col gap-2 mt-10">
						<h6 className="mb-2">{question.question}</h6>
						<CustomSelector
							id={question.id}
							value={question.rating}
							setValue={updateState}
						/>
						<p className="flex place-self-center md:place-self-end md:mr-10">Atualizado Em: {formatDate(question.updated_at)}</p>
					</div>
				))}
			</Card>
		</div>
	);
};

export default Circulo;
