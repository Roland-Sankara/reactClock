import React, {useState} from 'react';
import Label from './Label';

function App(){
    const [breakInterval, setBreakInterval] = useState(0);
    const [sessionInterval, setSessionInterval] = useState(0);

    const LABELS = [
        {id:'break-label', value:'Break Length', btnOne: 'break-decrement',btnTwo: 'break-increment', defaultVal:breakInterval||5, funcOne:breakIncrement,funcTwo:breakDecrement},
        {id:'session-label', value:'Session Length', btnOne: 'session-decrement', btnTwo: 'session-increment', defaultVal:sessionInterval||25, funcOne:sessionIncrement,funcTwo:sessionDecrement} 
    ]

    function resetClock(){
        setBreakInterval(0);
        setSessionInterval(0);
    }

    function breakIncrement(){
        if(breakInterval < 60){
            setBreakInterval(breakInterval+1);
        }
    }

    function breakDecrement(){
        if(breakInterval){
            setBreakInterval(breakInterval-1);
        }
    }

    function sessionIncrement(){
        if(sessionInterval < 60){
            setSessionInterval(sessionInterval+1);
        }
    }

    function sessionDecrement(){
        if(sessionInterval){
            setSessionInterval(sessionInterval-1);
        }
    }

    return (
        <div id="clock-body">
            <h1>Hello World</h1>
            <div id="labels">
                {LABELS.map((label)=><Label key={label.id} data={label} session={sessionInterval} break={breakInterval}/>)}
            </div>
            <div>
                <h3 id="timer-label">Session</h3>
                <p id="time-left">mm:ss</p>
            </div>
            <div id="controls">
            <i class="fas fa-pause"></i> <i class="fas fa-play"></i> <i id='reset' class="fas fa-redo" onClick={resetClock}></i>
            </div>
        </div>
    )
}

export default App;