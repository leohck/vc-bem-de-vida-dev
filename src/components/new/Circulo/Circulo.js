import React, { useState, useEffect, useRef } from "react";
import { CustomSelector } from "components/new";
import {
	getAspectTitleQuestions,
	updateAspectRating
} from "../../../services/PersonalService";
import { Button, Card } from "../../ui";
import store from "../../../store";
import { useNavigate } from "react-router-dom";

const Circulo = ({ title, icon }) => {
	const navigate = useNavigate();
	const [user_info_id, setUserInfoID] = useState(null);
	const [questions, setQuestionsValue] = useState([]);

	useEffect(() => {
		const { auth } = store.getState();
		const user_info_id = auth.user.user_info_id;
		setUserInfoID(user_info_id);
	}, []);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const resp = await getAspectTitleQuestions(user_info_id, title);
				if (resp.data) {
					const { questions } = resp.data;
					setQuestionsValue(questions);
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		if (user_info_id) {
			fetchQuestions();
		}
	}, [user_info_id]);

	const updateState = (question_id, value) => {
		const newState = questions.map((obj) => {
			if (obj.id === question_id) {
				return { ...obj, rating: value };
			}
			return obj;
		});
		setQuestionsValue(newState);
	};

	const updateQuestionRating = (id, value) => {
		const update = async () => {
			try {
				const resp = await updateAspectRating(id, parseInt(value));
				if (resp.data) {
					updateState(id, value);
				}
			} catch (errors) {
				console.log(errors);
			}
		};
		update();
	};

    const handleSave = () => {
        alert("sucesso!");
        navigate('dashboard', {replace: true})
    }

	return (
		<div>
			<div className="mb-8 grid justify-items-center">
				<div className="flex items-center gap-3">
					{icon}
					<h2>{title}</h2>
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
					<div key={index} className="mt-10">
						<h6 className="mb-2">{question.question}</h6>
						<CustomSelector
							id={question.id}
							value={question.rating}
							setValue={updateQuestionRating}
						/>
						<br />
					</div>
				))}
			</Card>
		</div>
	);
};

export default Circulo;
