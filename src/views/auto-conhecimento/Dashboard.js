import React, {useEffect, useState, useRef} from "react";
import { Chart } from "../../components/shared";
import {
    HEX_COLOR_NOT_RATED,
    HEX_COLOR_VERY_LOW,
    HEX_COLOR_LOW,
    HEX_COLOR_REGULAR,
    HEX_COLOR_HIGH,
    HEX_COLOR_VERY_HIGH,
    ASPECTS_TYPES,
    ASPECTS_QUESTIONS_SHORT
} from "constants/aspects.constant";
import { getAchievements, getDashboardData, getSkills } from "../../services/PersonalService";
import { CardWithDialog } from "../../components/new";

function hex_color_switch(value) {
    switch (value) {
        case 0:
            return HEX_COLOR_NOT_RATED;
        case 1:
            return HEX_COLOR_VERY_LOW;
        case 2:
            return HEX_COLOR_LOW;
        case 3:
            return HEX_COLOR_REGULAR;
        case 4:
            return HEX_COLOR_HIGH;
        case 5:
            return HEX_COLOR_VERY_HIGH;
        default:
            return HEX_COLOR_NOT_RATED;
    }
}

const Dashboard = () => {
    const effectRan = useRef(false);
    const user_info_id = 10;
    const [ratings, setRatings] = useState([]);
    const [radarData, setRadarData] = useState([]);
    const [skills, setSkills] = useState([]);
    const [skillsCount, setSkillsCount] = useState(0);
    const [achievements, setAchievements] = useState([]);
    const [achievementsCount, setAchievementsCount] = useState(0);
    const [shortQuestions, setShortQuestions] = useState(ASPECTS_QUESTIONS_SHORT);

    useEffect(() => {
        if (effectRan.current === false) {
            const fetchDashData = async () => {
                try {
                    const resp = await getDashboardData(user_info_id);
                    if (resp.data) {
                        const { radar_data, ratings, short_questions } = resp.data;
                        setRadarData(radar_data);
                        setRatings(ratings);
                        setShortQuestions(short_questions)
                    }
                } catch (errors) {
                    console.log(errors);
                }
            };
            const fetchSkillsData = async () => {
                try {
                    const resp = await getSkills();
                    if (resp.data) {
                        const skills  = resp.data;
                        setSkills(skills)
                        setSkillsCount(skills.length)
                    }
                } catch (errors) {
                    console.log(errors);
                }
            };
            const fetchAchievementsData = async () => {
                try {
                    const resp = await getAchievements();
                    if (resp.data) {
                        const achievements  = resp.data;
                        setAchievements(achievements)
                        setAchievementsCount(achievements.length)
                    }
                } catch (errors) {
                    console.log(errors);
                }
            };
            fetchDashData();
            fetchSkillsData();
            fetchAchievementsData();
            return () => {
                effectRan.current = true;
            };
        }
    }, []);

    return (
        <div>
            <div className="mb-8 grid justify-items-center">
                <h3>Resumo de suas Atividades</h3>
            </div>
            <div className="flex flex-row gap-4 justify-between">
                <div>
                    <CardWithDialog
                        title={"Ações em Andamento"}
                        itemType={"achievements"}
                        itemList={achievements}
                        setItemList={setAchievements}
                        itemCount={achievementsCount}
                        setItemCount={setAchievementsCount}
                    />
                </div>
                <div>
                    <CardWithDialog
                        title={"Metas"}
                        itemType={"achievements"}
                        itemList={achievements}
                        setItemList={setAchievements}
                        itemCount={achievementsCount}
                        setItemCount={setAchievementsCount}
                    />
                </div>
                <div>
                    <CardWithDialog
                        title={"Conquistas"}
                        itemType={"achievements"}
                        itemList={achievements}
                        setItemList={setAchievements}
                        itemCount={achievementsCount}
                        setItemCount={setAchievementsCount}
                    />
                </div>
                <div>
                    <CardWithDialog
                        title={"Habilidades"}
                        itemType={"skills"}
                        itemList={skills}
                        setItemList={setSkills}
                        itemCount={skillsCount}
                        setItemCount={setSkillsCount}
                    />
                </div>
            </div>

            <div className="mt-24 flex mb-20">
                <div className="w-1/2">
                    <div className="mb-8 grid justify-items-center">
                        <h3>Radar de Qualidade de Vida</h3>
                    </div>
                    <Chart
                        series={[{
                            name: "Radar Series 1",
                            data: radarData
                        }]}
                        height={600}
                        type="radar"
                        options={{
                            responsive: [
                                {
                                    breakpoint: 480,
                                    options: {
                                        chart: {
                                            width: 200
                                        },
                                        legend: {
                                            position: "left"
                                        }
                                    }
                                }
                            ],
                            dataLabels: {
                                enabled: true,
                                style: {
                                    colors: [getRadarColor(radarData)]
                                }
                            },
                            fill: {
                                type: "solid",
                                opacity: 0.5,
                                colors: [getRadarColor(radarData)]
                            },
                            xaxis: {
                                categories: ASPECTS_TYPES,
                                labels: {
                                    show: true,
                                    style: {
                                        colors: ["#a8a8a8"],
                                        fontSize: "15px",
                                        fontFamily: 'Arial'
                                    }
                                }
                            },
                            yaxis: {
                                min: 0,
                                max: 5
                            },
                            stroke: {
                                show: true,
                                width: 2,
                                colors: [getRadarColor(radarData)],
                                dashArray: 0
                            },
                            markers: {
                                colors: [getRadarColor(radarData)]
                            }
                        }}
                    />
                </div>
                <div className="w-1/2">
                    <div className="mb-8 grid justify-items-center">
                        <h3>Avaliação Detalhada</h3>
                    </div>
                    <Chart
                        series={[{ name: "Avaliação", data: ratings }]}
                        height={500}
                        type="bar"
                        options={{
                            colors: [function({ value }) {
                                switch (value) {
                                    case 0:
                                        return HEX_COLOR_NOT_RATED;
                                    case 1:
                                        return HEX_COLOR_VERY_LOW;
                                    case 2:
                                        return HEX_COLOR_LOW;
                                    case 3:
                                        return HEX_COLOR_REGULAR;
                                    case 4:
                                        return HEX_COLOR_HIGH;
                                    case 5:
                                        return HEX_COLOR_VERY_HIGH;
                                    default:
                                        return HEX_COLOR_NOT_RATED;
                                }
                            }],
                            title: {
                                text: "Perguntas x Avaliações",
                                align: "left",
                                floating: true
                            },
                            plotOptions: {
                                bar: {
                                    borderRadius: 4,
                                    horizontal: true
                                }
                            },
                            dataLabels: {
                                enabled: false
                            },
                            stroke: {
                                show: true,
                                width: 2,
                                colors: ["transparent"]
                            },
                            xaxis: {
                                categories: shortQuestions
                            },
                            yaxis: {
                                reversed: false,
                                axisTicks: {
                                    show: true
                                }
                            },
                            fill: {
                                type: "gradient",
                                opacity: 1
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


const getRadarColor = (data) => {
    const sum = data.reduce((partialSum, a) => partialSum + a, 0);
    return hex_color_switch(Math.round(sum / 5));
};