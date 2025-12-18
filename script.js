
//open feature fnc
function openFeature() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElemPage = document.querySelectorAll(".fullElem");
  let allFullElemBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", (evt) => {
      allFullElemPage[elem.id].style.display = "block";
    });
  });

  allFullElemBackBtn.forEach((elem) => {
    elem.addEventListener("click", () => {
      // console.log(elem.id)
      allFullElemPage[elem.id].style.display = "none";
    });
  });
}
//open feature fnc called
openFeature();

let form = document.querySelector(".addTask form");
let input = document.querySelector(".addTask form #task-input");
let textArea = document.querySelector(".addTask form textarea");
let taskCheckBox = document.querySelector(".addTask form #check");


//todoList fnc logic
function todoList() {
  let currentTask = [];
  let savedData = localStorage.getItem("currentTask");

  if (savedData) {
    currentTask = JSON.parse(savedData);
  } else {
    console.log("localStorage is empty");
  }

  // localStorage.clear()

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    if (input.value && textArea.value) {
      currentTask.push({
        task: input.value,
        detail: textArea.value,
        check: taskCheckBox.checked,
      });
    }
    renderTask();
    input.value = "";
    textArea.value = "";
    taskCheckBox.checked = false;
  });

  function renderTask() {
    let allTask = document.querySelector(".allTask");
    let data = "";
    currentTask.forEach((elem, index) => {
      data += `<div class="task">
                    <h5>${elem.task} <span class=${elem.check}>imp</span></h5>
                    <button id=${index}>mark compeleted</button>
                </div>`;
    });

    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    allTask.innerHTML = data;

    let allTaslBtn = document.querySelectorAll(".task button");
    allTaslBtn.forEach((btn) => {
      btn.addEventListener("click", (evt) => {
        currentTask.splice(currentTask[btn.id], 1);
        renderTask();
      });
    });
  }

  renderTask();
}
//todo fnc called
todoList()

//Day Planner Section Logic
function dailyPlanner(){
  let dayPlanData= JSON.parse(localStorage.getItem('dayPlanData')) || {};



let hours=Array.from({length:18},(_,index)=> `${6+index}:00-${7+index}:00`)

let dayPlanner=document.querySelector('.dailyPlan-fullPage .day-planner')

let wholeDaySum = ''
hours.forEach((elem,index)=>{
  let savedInputsData=dayPlanData[index] || ''
  wholeDaySum += `<div class="day-planner-time">
                <p>${elem}</p>
                <input id=${index} type="text" placeholder="..." value=${dayPlanData[index] || ''}>
            </div>`
})

dayPlanner.innerHTML=wholeDaySum

let dayPlannerInput=document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach((elem,index)=>{
  
  elem.addEventListener('input',()=>{
    console.log(elem.value)
   
    dayPlanData[index]=elem.value

    localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
     
  })
})
}
//daily pnannner called
dailyPlanner()


//motivation qoute section logic


function motivationalQoute(){
  let motivationQoute=document.querySelector('.motivation2 h1');
let motivationQouteAuthor=document.querySelector('.motivation3 h2');

async function fetchQoute(){
  let rawResponse= await fetch('https://api.quotable.io/random')
  let response=await rawResponse.json();

motivationQoute.innerText=response.content
motivationQouteAuthor.innerText=response.author
}

fetchQoute()
}
//motivation qoute fnc called
motivationalQoute()


//Pomodoro section logic

let pomoTime=document.querySelector('.pomodoro-fullPage .pomodoro-containt h1')

let startTime=document.querySelector('.pomodoro-containt .pomoBtns .start')
let pauseTime=document.querySelector('.pomodoro-containt .pomoBtns .pause')
let resetTime=document.querySelector('.pomodoro-containt .pomoBtns .reset')



let btns=document.querySelectorAll('.pomodoro-containt .timer')

let timerId=null;
let isRunning=false;

btns.forEach((elem,index)=>{
  elem.addEventListener('click',()=>{
    // console.log()
    //start button
    if(index === 0 ){
      startTimer()
      console.log(isRunning)
      elem.setAttribute('disabled','')
    } 

    //pause button
    if(index=== 1) {
      clearInterval(timerId)
      startTime.removeAttribute('disabled')
      isRunning=false
    }
    //reset button
    if(index === 2 ){
      clearInterval(timerId);
      startTime.removeAttribute('disabled')
      pomoTime.innerText=`25:00`
    }
  })
})

//timer setting
let totalSecond=25*60;
function setTime(){
let minutes=Math.floor(totalSecond/60);
let seconds=totalSecond%60;

pomoTime.innerText=`${(minutes.toString()).padStart(2,0)}:${(seconds.toString()).padStart(2,0)}`
}

//timer starter
function startTimer(){
  isRunning=true;
  timerId=setInterval(()=>{
  totalSecond--
  if(totalSecond==0){
    clearInterval(timerId)
    pomoTime.style.color='red'

  }

  setTime()
},1000)
}

