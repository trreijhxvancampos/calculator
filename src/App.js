import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button"
import CalcProvider from "./context/CalcContext";

const bttnValues = [
  ["^", "%", "+-", "/"],
  [7,8,9,"x"],
  [4,5,6, "-"],
  [1,2,3, "+"],
  ["C", 0,".", "="]
]

function App() {
  return (
    <CalcProvider>
    <Wrapper>
        <Screen></Screen>
        <ButtonBox>
          {bttnValues.flat().map((btn,i) => 
          <Button value={btn} key={i}></Button>)}

        </ButtonBox>
    </Wrapper>
    </CalcProvider>

  );
}

export default App;
