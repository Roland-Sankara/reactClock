import React from 'react';

function Label({data}){
    return(
        <div id={data.id}>
            <p>{data.value}</p>
            <div id="interval-controls">
                <i id={data.btnOne} className="fas fa-arrow-down" onClick={()=>data.updateIntervals(-60,data.type)}></i>
                <span id={data.displayId} >{data.formatInterval(data.time) || data.default}</span>
                <i id={data.btnTwo} className="fas fa-arrow-up" onClick={()=>data.updateIntervals(60,data.type)}></i>
            </div>
            
        </div>
    )
}

export default Label;