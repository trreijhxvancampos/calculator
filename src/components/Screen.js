import {useContext} from "react"
import {CalcContext} from "../context/CalcContext"

const Screen = () => {
    const {calc} = useContext(CalcContext);
    return (
        <>
            <div>{calc.numA} {calc.operation != null ? calc.operation : ''} {calc.numB != null ? calc.numB : ''} prev:{calc.prev}</div>
        </>
    )
}

export default Screen