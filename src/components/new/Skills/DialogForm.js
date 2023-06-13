import React, { useState } from 'react'
import { Button, Dialog, Select } from 'components/ui'
import { FaPlusSquare } from 'react-icons/fa'
import {
    aptidoesOptions,
    conquistasGroupedOptions,
} from '../../../views/auto-conhecimento/form.options'
import { postItem } from '../../../services/PersonalService'
import CreatableSelect from 'react-select/creatable'
import { HiCheck } from 'react-icons/hi'
import { components } from 'react-select'
const { MultiValueLabel } = components

const DialogForm = (props) => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [newItem, setNewItem] = useState('')
    const { itemType, itemList, setItemList, itemCount, setItemCount } = props
    const user_info_id = 8
    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        setIsOpen(false)
        addItem(user_info_id, newItem)
    }
    const addItem = (id, value) => {
        const update = async () => {
            try {
                console.log(itemType, { user: id, value: value })
                const resp = await postItem(itemType, {
                    user: id,
                    value: value,
                })
                if (resp.data) {
                    console.log(resp.data)
                    setItemCount(itemCount + 1)
                    setItemList([...itemList, resp.data])
                }
            } catch (errors) {
                console.log(errors)
            }
        }
        update()
    }

    // const newoptions1 = aptidoesOptions.filter(ad =>
    //     itemList.every(fd => fd.value !== ad.label)
    // );
    // const newoptions = conquistasGroupedOptions.filter(ad =>
    //     itemList.every(fd => fd.value !== ad.label)
    // );

    const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
        return (
            <div
                className={`flex items-center justify-between p-2 ${
                    isSelected
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                {...innerProps}
            >
                <div className="flex items-center">
                    {data.icon}
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }
    const CustomControlMulti = ({ children, data, ...props }) => {
        const { icon } = data
        return (
            <MultiValueLabel {...props}>
                <div className="inline-flex items-center">
                    {icon} &nbsp;
                    {children}
                </div>
            </MultiValueLabel>
        )
    }
    const formatGroupLabel = (data) => (
        <div className="font-bold text-xs uppercase text-gray-800 dark:text-white my-2">
            {data.label}
        </div>
    )

    return (
        <div>
            <Button
                shape="circle"
                size="xs"
                variant="twoTone"
                icon={<FaPlusSquare />}
                onClick={() => openDialog()}
            />
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Cadastrar Nova Habilidade</h5>
                <div>
                    {itemType === 'skills' ? (
                        <>
                            <span>Lista de Habilidades</span>
                            <Select
                                isClearable={false}
                                isMulti={false}
                                placeholder="Lista de Aptidoes"
                                options={aptidoesOptions}
                                onChange={({ label }) => setNewItem(label)}
                                componentAs={CreatableSelect}
                            />
                        </>
                    ) : (
                        <>
                            <span>Lista de Conquistas</span>
                            <Select
                                isMulti
                                placeholder="Lista de Conquistas"
                                options={conquistasGroupedOptions}
                                components={{
                                    Option: CustomSelectOption,
                                    MultiValueLabel: CustomControlMulti,
                                }}
                                formatGroupLabel={formatGroupLabel}
                                className="mb-4"
                            />
                        </>
                    )}
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancelar
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Salvar
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default DialogForm
