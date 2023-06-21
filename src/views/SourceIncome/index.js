import React, { useState } from 'react'
import SourceIncomeForm from './SourceIncomeForm'
import SourceIncomeList from './SourceIncomeList'

const SourceIncome = () => {
    const [itemID, setItemID] = useState(null)
    const [formTitle, setFormTitle] = useState('Cadastrar')

    const handleItemIDChange = (value) => {
        setItemID(value)
        setFormTitle('Alterar')
    }

    return (
        <div className="flex flex-col gap-4">
            <SourceIncomeForm
                itemID={itemID}
                setItemID={setItemID}
                formTitle={formTitle}
                setFormTitle={setFormTitle}
            />
            <SourceIncomeList setItemID={handleItemIDChange} />
        </div>
    )
}

export default SourceIncome
