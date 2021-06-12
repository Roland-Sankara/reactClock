import React, {useState, useRef} from 'react';
import Label from './Label';

function App(){

    const [breakTime, setBreakTime] = useState(5*60);
    const [sessionTime, setSessionTime] = useState(25*60);
    const [displayTime, setDisplayTime] = useState(25*60);

    const [isPlaying, setIsPlaying] = useState(false);
    const [onBreak, setOnBreak] = useState(false);

    const audioElement = useRef(null);
    

    const LABELS = [
        {
            id:'break-label',
            value:'Break Length',
            btnOne: 'break-decrement',
            btnTwo: 'break-increment', 
            type: 'break',
            updateIntervals: updateIntervals,
            formatInterval: formatInterval,
            time: breakTime,
            displayId:"break-length",
            default:'5'
        },
        {
            id:'session-label', 
            value:'Session Length', 
            btnOne: 'session-decrement', 
            btnTwo: 'session-increment',
            type:'session',
            updateIntervals: updateIntervals,
            formatInterval: formatInterval,
            time: sessionTime,
            displayId:"session-length",
            default:'25'
        } 
    ]

    // Component Methods

    // Play audio
    const playAudio = ()=>{
        // let audioElement = document.querySelector('#beep');
        console.log("Playing Audio......");
        // audioElement.id = "beep";
        audioElement.current.currentTime = 0;
        audioElement.current.play();
    }

    // reset the clock
    function resetClock(){
        setDisplayTime(25*60);
        setBreakTime(5*60);
        setSessionTime(25*60);
    }

    // Update the Session time and the break time
    function updateIntervals(amount,type){
        if(type === 'break'){
            if(breakTime <= 60 && amount < 0 ){
                return;
            }
            if(breakTime > 3540 && amount > 0){
                return;
            }
            setBreakTime(prev=>prev+amount);
        }else{
            if(sessionTime <= 60 && amount < 0){
                return;
            }
            if(sessionTime > 3540 && amount > 0){
                return;
            }
            setSessionTime(prev=>prev+amount);

            if(!isPlaying){
                setDisplayTime(sessionTime+amount);
            }
        }
    }


    // The Display of the Time on the clock
    function formatClockTime(time){
        let minutes = Math.floor(time/60);
        let seconds = time % 60;

        return `${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`;
    }

    // fomart interval time
    function formatInterval(time){
        return Math.floor(time/60).toString();
    }

    // controls the session and the break times display
    function controlClock(){
        console.log('Hello....')
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime()+second;
        let onBreakVariable = onBreak;
        if(!isPlaying){
            let interval = setInterval(()=>{
                date = new Date().getTime();
                if(date > nextDate){
                    setDisplayTime((prev)=>{
                        if(prev <=0 && !onBreakVariable){
                            playAudio();
                            onBreakVariable = true;
                            setOnBreak(true);

                            return breakTime;
                        }else if(prev <=0 && onBreakVariable){
                            playAudio();
                            onBreakVariable = false;
                            setOnBreak(false);
                            return sessionTime;
                        }
                         return prev - 1
                    });
                    nextDate += second;
                }
            },30);
            localStorage.clear();
            localStorage.setItem('intervalId', interval);
        }

        if(isPlaying){
            clearInterval(localStorage.getItem('intervalId'));
        }
        setIsPlaying(!isPlaying);

    }



    return (
        <div id="clock-body">
            <h1>Pomodoro Clock</h1>
            <div id="labels">
                {LABELS.map((label)=><Label key={label.id} data={label}/>)}
            </div>
            <div id="time-display">
                <h3 id="timer-label">{onBreak?"Break":"Session"}</h3>
                <p id="time-left">{formatClockTime(displayTime)}</p>
            </div>
            <div id="controls">
            <i className="fas fa-pause" onClick={controlClock}></i> <i className="fas fa-play" id="start_stop" onClick={controlClock}></i> <i id='reset' className="fas fa-redo" onClick={resetClock}></i>
            </div>

            <audio ref={audioElement} src="https://www.soundjay.com/buttons/sounds/beep-09.mp3" id="beep" preload="auto" />
        
        </div>
    )
}

export default App;