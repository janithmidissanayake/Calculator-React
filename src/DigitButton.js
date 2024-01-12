import { ACTION } from "./App"
export default function DigitButton(props) {
    return(
        <button onClick={() => props.dispatch({type:ACTION.ADD_DIGIT,payload:{digit:props.digit}}) }>
           {props.digit}
        </button>
    )
}
