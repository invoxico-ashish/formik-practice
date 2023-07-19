import React, {useState } from "react";

function State () {

    const [Count, setCount] =useState(0)
    
    return(
        <>
        <div>
        <h1>{Count}</h1>
        <button onClick={()=>setCount(Count + 1)}> dec he</button>
        <button onClick={()=>setCount(Count - 1)}>inc</button>
        </div>
        </>
    );
}


export default State;