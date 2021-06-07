import React from 'react';

function Label({data}){
    return(
        <div id={data.id}>
            <p>{data.value}</p>
            <i id={data.btnOne} class="fas fa-arrow-down" onClick={data.funcTwo}></i><span> {data.defaultVal} </span><i id={data.btnTwo} class="fas fa-arrow-up" onClick={data.funcOne}></i>
        </div>
    )
}

export default Label;