import { ACTION } from "./App"
export default function OperationButton(props) {
    return(
        <button onClick={() => props.dispatch({type:ACTION.CHOOSE_OPERATION,payload:{operation:props.operation}}) }>
           {props.operation}
        </button>
    )
}
