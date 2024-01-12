import {useReducer} from "react";
import './App.css';
import "./Styles.css"
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTION={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}

function reducer(state,{type,payload}){
  console.log(state);
  switch(type) {
    case ACTION.ADD_DIGIT:
      //Avoid the repetition of zero
      if(state.overwrite){

      return {
        ...state,
        currentOperand:payload.digit,
        overwrite:false
      }
      }

      if(payload.digit=== "0" && state.currentOperand === "0" ){
        return state
      } 
      //Avoid the . using repeatedly.
      if(payload.digit === "." && state.currentOperand.includes(".")){
        return state
      }

      return {
      ...state,
      currentOperand: `${state.currentOperand||"" }${payload.digit}`
      
       }
    console.log(state.currentOperand);

    case ACTION.DELETE_DIGIT:
       if(state.overwrite){
        return {
          ...state,
          currentOperand : null,
          overwrite:false
        }
       }
       if(state.currentOperand==null){
        return state
       }
       if(state.currentOperand.length === 1){
        return {
          ...state,
          currentOperand : null
        }
       }

       return {
        ...state,currentOperand:state.currentOperand.slice(0,-1)
       }

    case ACTION.CHOOSE_OPERATION:

       if(state.currentOperand== null && state.previousOperand === null){
      return state
      }

      if(state.currentOperand == null){
        return{
          ...state,
          operation:payload.operation
        }
      }

    if(state.previousOperand == null){
      return{// create a copy of object ...state and it has been modified
        ...state, 
        operation:payload.operation,
        previousOperand:state.currentOperand,
        currentOperand :null,
      }
    }
      
    return{
      ... state,
      operation:payload.operation,
      previousOperand:evaluate(state),
      currentOperand: null,
    }

    case ACTION.CLEAR:
      return{}// returns a null object .to indicate that entire state object is null
    
    case ACTION.EVALUATE:
      if(state.currentOperand== null|| state.operation == null || state.previousOperand== null){
        return state;
      }

      return{
        ...state,
        previousOperand : null,
        currentOperand:evaluate(state),
        operation:null

      }
    
  }

}

function evaluate( {previousOperand,currentOperand,operation}){//use {} bcause those are has destructed from the state object.
  const prev =parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if(isNaN(prev)|| isNaN(current)) return ""
  let computation="";// for assign different values
  switch(operation){
    case "+":
    computation = prev+current
    break
    case "-":
    computation = prev-current
    break
    case "*":
      computation = prev *current
      break
    case "/" :
      computation = prev /current

      break
       }

       return computation.toString();

}

const INTEGER_FORMATTER= new Intl.NumberFormat("en-us",{
    maximumFractionDigits :0,
})

function formatOperand(operand){
  if(operand== null){
    return
  }

  const [integer,decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function App() {
  const [{currentOperand,previousOperand,operation}, dispatch] = useReducer(reducer, {
    currentOperand: '',  // Provide an initial value for currentOperand
    previousOperand: '',
    operation: ''
  })
   

  return (
    <div className="calculator-wrapper">
      <div className="output">
      <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
      <div className="current-operand">{ formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTION.CLEAR})}>AC</button> 
      <button className="" onClick={()=>dispatch({type:ACTION.DELETE_DIGIT})}>DEL</button> 
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />

      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch}/>

 
      
      <DigitButton digit="4" dispatch={dispatch} />

      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch}/>
     
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch}/>

    
      <DigitButton digit="." dispatch={dispatch} />

      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={()=>dispatch({type:ACTION.EVALUATE})}>=</button>
 
 

            
    </div>
  );
}

export default App;
