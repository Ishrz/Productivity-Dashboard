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

// openFeature();

let form = document.querySelector(".addTask form");
let input = document.querySelector(".addTask form #task-input");
let textArea = document.querySelector(".addTask form textarea");
let taskCheckBox = document.querySelector(".addTask form #check");



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

// todoList()

//Day Planner Section Logic
let dayPlanData= JSON.parse(localStorage.getItem('dayPlanData')) || {};

let dayPlannerInput=document.querySelectorAll('.day-planner input')

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


dayPlannerInput.forEach((elem,index)=>{
  
  elem.addEventListener('input',()=>{
    console.log(elem.value)
   
    dayPlanData[index]=elem.value
    console.log(dayPlanData)
    localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
     
  })
})

