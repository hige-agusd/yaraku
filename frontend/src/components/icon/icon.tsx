import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash  } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

const map: { [index in IconPropsTypes]: IconDefinition} = {
    faPencil,
    faTrash,
};

type IconPropsTypes = 'faPencil' | 'faTrash';

interface IIcon {
    type: IconPropsTypes;
}

const Icon: FC<IIcon> = ({type})=>{
    return <FontAwesomeIcon icon={map[type]} />
}

export default Icon;
