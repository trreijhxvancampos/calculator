import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"

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
  
  // when user clicks comma
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value:calc.num
    })
  }

  // when user clicks C
  const resetClick = () =>{
    setCalc({ sign: '', num:0, res:0})
  }

  // when user clicks a number
  const handleClickButton = () => {
    const numberString = value.toString()

    let numberValue;
    if (numberString === '0' && calc.num ===0) {
        numberValue = "0" // no need to increment additional 0 if num is 0
    } else {
      numberValue = Number(calc.num + numberString)
    }
    setCalc({
      ...calc,
      num: numberValue
    })
  }

  // when user clicks an operation
  const operationClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    })
  }

  // when user clicks equals
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          '^': (a,b) => a**b,
          '%': (a,b) => a%b,
          '/': (a,b) => a/b,
          'x': (a,b) => a*b,
          '+': (a,b) => a+b,
          '-': (a,b) => a-b,
        }
        return result[sign](a,b);
      }
      setCalc({
        res:math(calc.res, calc.num, calc.sign),
        sign: '',
        num: 0
      })
    
  }
}
  
  // when user clicks invert
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num *-1 : 0,
      res: calc.res ? calc.res *-1 : 0,
      sign: ''
    })
  }


  const handleBttnClick = () => {
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
      return results[value]()
    } else{
      return handleClickButton()
    }
  }

  return (
    <button className={`${getStyleName(value)} button`} onClick={handleBttnClick}>{value}</button>
  )
}

export default Button