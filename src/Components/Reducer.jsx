import React from "react";
import { FaReact } from 'react-icons/fa';
// import { act } from "react-dom/test-utils";

const intialState = 0;

const reducer = (state, action) => {
    if (action.type === "INCREMENT") {
        return state + 1;
    }
    if (action.type === "DECREMENT") {
        return state - 1;
    }
    return state;
}

function Reducer() {
    const [state, dispatch] = React.useReducer(reducer, intialState)
    return (
        <>
            <div>
                <p>{state}</p>
                <button onClick={() => dispatch({ type: "INCREMENT" })}>INC</button>
                <button onClick={() => dispatch({ type: "DECREMENT" })}>DEC</button>
            </div>
             <div>
             <FaReact />
             </div>
        </>
    );
}

export default Reducer;