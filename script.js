
let breakTime =false;
let counter = 0;

let isRunning = false;
let timer;
let breaks;

let hours , minutes, seconds;
const showNotification = (message) =>{
    const notif = document.getElementById("break-notifasion");
    notif.textContent = message;
    
    if(message === "Break!"){
        notif.classList.add("show-break");
        setTimeout(() => {
            notif.classList.add("show-top")
        }, 3000);
    }
    else{
        notif.classList.add("show-break-end");
        setTimeout(() => {
            notif.classList.add("show-top")
        },  3000);
    }
}

const breakStartEnd  = () =>{
    if(breakTime){
        if(counter === 300){
            counter = 0;
            breakTime = false;
            playBreakEndAlert();
            showNotification("Break Time Left!");
        }
        counter++;
        breaksCalculation();
    }
    else{
        if(counter === 1){          
            counter = 0;
            breakTime = true;
            playBreakAlert();
            showNotification("Break!");
        }
        counter++;
        breaksCalculation();
    }
};
const playBreakAlert = () => {
    const alertBSSound = new Audio('Audio/break.wav');
    alertBSSound.play();
};
const playBreakEndAlert = () => {
    const alertBESound = new Audio('Audio/end-of-break.wav');
    alertBESound.play();
};

const breaksCalculation = () => {
    hours = parseInt(document.getElementById("hours").value);
    minutes = parseInt(document.getElementById("minutes").value);

    breaks = (hours * 60 + minutes) / 30;

    document.getElementById("breaks-num-left").textContent = breaks.toFixed(0);
    document.getElementById("breaks-num-total").textContent = breaks.toFixed(0);
};

document.getElementById("hours").addEventListener('input', breaksCalculation);
document.getElementById("minutes").addEventListener('input', breaksCalculation);
document.getElementById("seconds").addEventListener('input', breaksCalculation);


const displayTime = () => {
    document.getElementById("hours").value = String(hours).padStart(2, '0');
    document.getElementById("minutes").value = String(minutes).padStart(2, '0');
    document.getElementById("seconds").value = String(seconds).padStart(2,'0');
};

const displayLeftBreaks = () => {
    document.getElementById("breaks").style.display = "none";
    document.getElementById("breaks-after").style.display = "block";
};

const startTimer = () => {
    if(isRunning) return;
    displayLeftBreaks();

    hours = parseInt(document.getElementById("hours").value);
    minutes = parseInt(document.getElementById("minutes").value);
    seconds = parseInt(document.getElementById("seconds").value);
    isRunning = true;
    timer = setInterval(() => {
        if(seconds === 0){
            if(minutes === 0){
                if(hours === 0){
                    clearInterval(timer);
                    isRunning = false;
                    alert("end");
                    return;
                }
                hours--;
                minutes = 59;
                seconds = 59; 
            }
            else{
                minutes--;
                seconds = 59; 
            }
        }
        else{
            seconds--;
        }
        
        displayTime();
        breakStartEnd();

    } , 1000);
};

const stopTimer = () => {
    clearInterval(timer);
    isRunning = false;
};

const resetTimer = () => {
    clearInterval(timer);
    isRunning = false;
    hours = 0;
    minutes = 30;
    seconds = 0;
    counter = 0;
    displayTime();
};


document.getElementById("start").addEventListener(`click`, startTimer);
document.getElementById("stop").addEventListener(`click`, stopTimer);
document.getElementById("reset").addEventListener(`click`, resetTimer);




resetTimer();
breaksCalculation();
