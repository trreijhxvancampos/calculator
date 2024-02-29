import {useContext} from "react"
import {CalcContext} from "../context/CalcContext"

const getStyleName = bttn => {
    const className = {
        '=': 'equals',
        '^': 'opt',
        '%': 'opt',
        '+-': 'opt',
        '/': 'opt',
        '+': 'opt',
        'x': 'opt',
        '-': 'opt',
        'C': 'clear',

    }
    return className[bttn]
}

const Button = ({value}) => {
    const {calc, setCalc} = useContext(CalcContext);

    const getNumToModify = () => {
        return calc.operation === null ? "numA" : "numB";
    }

    // when user clicks comma
    const commaClick = (numToModify) => {
        setCalc({
            ...calc,
            [numToModify]: !calc[numToModify].toString().includes('.') ? calc[numToModify] + value : calc[numToModify]
        })
    }

    // when user clicks C
    const resetClick = () => {
        setCalc({
            numA: 0,
            numB: null,
            operation: null,
            prev: 0,
        })
    }

    // when user clicks a number
    const handleClickNumber = (numToModify) => {
        const numberString = value.toString()

        let numberValue;
        if (calc[numToModify] === null) {
            numberValue = Number(numberString)

        } else if (numberString === '0' && calc[numToModify] === 0) {
            numberValue = 0 // no need to increment additional 0 if num is 0
        } else {
            numberValue = Number(calc[numToModify] + numberString)
        }

        setCalc({
            ...calc,
            [numToModify]: numberValue
        })
    }

    // when user clicks an operation
    const operationClick = () => {
        setCalc({
            ...calc,
            operation: value,
        })
    }

    // when user clicks equals
    const equalsClick = () => {
        if (calc.numB != null) {
            const math = (a, b, sign) => {
                const result = {
                    '^': (a, b) => a ** b,
                    '%': (a, b) => a % b,
                    '/': (a, b) => a / b,
                    'x': (a, b) => a * b,
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                }
                return result[sign](a, b);
            }

            setCalc({
                prev: calc.numA,
                numA: math(calc.numA, calc.numB, calc.operation),
                numB: null,
                operation: null,
            })

        }
    }

    // when user clicks invert
    const invertClick = (numToModify) => {
        setCalc({
            ...calc,
            [numToModify] : calc[numToModify] ? calc[numToModify] * -1 : 0
        })
    }


    const handleClickButton= () => {
        const numToModify = getNumToModify()
        const results = {
            '.': commaClick,
            'C': resetClick,
            '^': operationClick,
            '%': operationClick,
            '+-': invertClick,
            '/': operationClick,
            'x': operationClick,
            '+': operationClick,
            '-': operationClick,
            '=': equalsClick,
        }
        if (results[value]) {
            return results[value](numToModify)
        } else {
            return handleClickNumber(numToModify)
        }
    }

    return (
        <button className={`${getStyleName(value)} button`} onClick={handleClickButton}>{value}</button>
    )
}

export default Button