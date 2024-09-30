const decrementBtn=document.getElementById('break-decrement')
const incrementBtn=document.getElementById('break-increment')
let btnLvlElement = document.querySelector('.btn-level');
let btnLvl = parseInt(btnLvlElement.innerHTML);
const sessionincrementBtn=document.getElementById('session-increment')
const sessiondecrementBtn=document.getElementById('session-decrement')
let sessionlvlElement=document.querySelector('.session-level')
let sessionlvl=parseInt(sessionlvlElement.innerHTML);
const resetBtn=document.getElementById('reset')
const startStopBtn=document.getElementById('start_stop')
const timeLeft = document.getElementById("time-left");
const timerLabel = document.getElementById("timer-label");



if (isNaN(btnLvl) || btnLvl < 5) {
    btnLvl = 5; 
  }
  
incrementBtn.onclick = function () {
    if (btnLvl < 60) {
      btnLvl++;
      btnLvlElement.innerHTML = btnLvl; 
    }
  };
decrementBtn.onclick = function () {
    if (btnLvl > 5) {
      btnLvl--;
      btnLvlElement.innerHTML = btnLvl; 
    }
  };

if (isNaN(btnLvl) || sessionlvl < 25) {
    sessionlvl = 25; 
  }

  sessionincrementBtn.onclick = function(){
    if (sessionlvl<60){
        sessionlvl++;
        sessionlvlElement.innerHTML=sessionlvl
        timeLeft.innerHTML = sessionlvl + ":00";
    }
  }
  sessiondecrementBtn.onclick=function(){
    if (sessionlvl>25){
        sessionlvl--;
        sessionlvlElement.innerHTML=sessionlvl
        timeLeft.innerHTML = sessionlvl + ":00";
    }
  }
  let sessionLength = 25 * 60; // Session duration in seconds (25 minutes)
  let breakLength = 5 * 60;    // Break duration in seconds (5 minutes)
  let currentTime = sessionLength; 
  let intervalID; 
  let isRunning = false; // Timer is initially paused
  let isSession = true;  // Start with the session
  
  // Function to format time in MM:SS
  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  // Function to start the timer
  function startTimer() {
    intervalID = setInterval(() => {
      currentTime--;
      timeLeft.innerHTML = formatTime(currentTime);
  
      // Check if the timer hits 0
      if (currentTime <= 0) {
        clearInterval(intervalID);
        if (isSession) {
          // Switch to break
          isSession = false;
          timerLabel.innerText = "Break";
          currentTime = breakLength;
        } else {
          // Switch back to session
          isSession = true;
          timerLabel.innerText = "Session";
          currentTime = sessionLength;
        }
        startTimer(); // Start the next phase automatically
      }
    }, 1000);
  }
  
  // Function to start/pause the timer
  function toggleTimer() {
    if (!isRunning) {
      startTimer();
      isRunning = true;
      startStopBtn.innerText = '⏸️'; // Change button to pause symbol
    } else {
      clearInterval(intervalID);
      isRunning = false;
      startStopBtn.innerText = '▶️'; // Change button back to play symbol
    }
  }
  
  // Function to reset the timer
  function resetTimer() {
    clearInterval(intervalID);
    isRunning = false;
    isSession = true;
    currentTime = sessionLength;
    timerLabel.innerText = "Session";
    timeLeft.innerHTML = formatTime(currentTime);
    startStopBtn.innerText = '⏯️'; // Set back to play/pause symbol
  }
  
  // Event listeners for start/stop and reset buttons
  startStopBtn.addEventListener("click", toggleTimer);
  resetBtn.addEventListener("click", resetTimer);
  
  // Set initial time display
  timeLeft.innerHTML = formatTime(currentTime);