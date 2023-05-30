import React, { useState, useEffect, useRef } from "react";
import { CustomSelector } from "components/new";
import { getAspectTitleQuestions, updateAspectRating } from "../../../services/PersonalService";

const Circulo = ({ title }) => {
    const user_info_id = 8;
    const effectRan = useRef(false);
    const [questions, setQuestionsValue] = useState([]);

    useEffect(() => {
        if (effectRan.current === false) {
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
            fetchQuestions();
            return () => {
                effectRan.current = true;
            };
        }
    }, [title]);


    const updateState = (question_id, value) => {
        const newState = questions.map(obj => {
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

    return (
        <div>
            <h2 className="items-center">{title}</h2>
            {questions.map((question, index) =>
                <div key={index}>
                    <h6>{question.question}</h6>
                    <CustomSelector
                        id={question.id}
                        value={question.rating}
                        setValue={updateQuestionRating}
                    />
                    <br />
                </div>
            )}
        </div>
    );
};

export default Circulo;
