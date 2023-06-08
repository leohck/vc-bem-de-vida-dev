import React from "react";
import {Circulo} from "../../../components/new";
import { MdGroups } from "react-icons/md";

const VidaSocial = () => {
    const titulo = 'Vida Social'
    return (
        <Circulo
            title={titulo}
            icon={<MdGroups size="4em"
                            className="h-10"/>}
        />
    )
}

export default VidaSocial