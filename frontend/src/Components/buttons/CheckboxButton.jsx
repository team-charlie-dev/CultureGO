import Cross from "../../Components/icons/Cross.svg"

import {useState} from 'react'


const CheckboxButton = ({clickHandler}) => {
    var [checked, setChecked] = useState(false)

    const func = () => {
        setChecked(!checked)
        clickHandler(!checked)
    }

    return (
        <div className={`w-10 h-10 bg-white border`} onClick={func}>
            <img style={{display: checked ? 'block' : 'none' }}className="h-full w-full" src={Cross}/>
        </div>
    )
}

export default CheckboxButton