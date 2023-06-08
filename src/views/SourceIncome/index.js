import React, { useRef, useState } from 'react'
import SourceIncomeForm from './SourceIncomeForm'
import SourceIncomeList from './SourceIncomeList'
import { useDispatch, useSelector } from "react-redux";

const SourceIncome = () => {
    const dispatch = useDispatch();
    const userInfoLoaded = useRef(false);
    const user_info = useSelector((state) => state.userinfo.userInfoState);
    const [user_info_id, setUserInfoID] = useState(null);
    const [itemID, setItemID] = useState(null);
    const [formTitle, setFormTitle] = useState('Cadastrar');


    const handleItemIDChange = (value) => {
        setItemID(value);
        setFormTitle('Alterar');
    }

    return (
        <div className="flex flex-col gap-4">
            <SourceIncomeForm
                user_info_id={1}
                itemID={itemID}
                setItemID={setItemID}
                formTitle={formTitle}
                setFormTitle={setFormTitle}
            />
            <SourceIncomeList user_info_id={1} setItemID={handleItemIDChange}/>
        </div>
    )
}

export default SourceIncome;
