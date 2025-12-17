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

openFeature();

let form = document.querySelector(".addTask form");
let input = document.querySelector(".addTask form #task-input");
let textArea = document.querySelector(".addTask form textarea");
let taskCheckBox = document.querySelector(".addTask form #check");

let currentTask = [];
let savedData=localStorage.getItem('currentTask')

if(savedData){
  currentTask=JSON.parse(savedData)
}else{
  console.log('localStorage is empty')
}



// localStorage.clear()



form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if(input.value && textArea.value){
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
  currentTask.forEach((elem,index) => {
    data += `<div class="task">
                    <h5>${elem.task} <span class=${elem.check}>imp</span></h5>
                    <button id=${index}>mark compeleted</button>
                </div>`;
  });

  
  console.log(currentTask)
  localStorage.setItem('currentTask',JSON.stringify(currentTask))
  allTask.innerHTML = data;
  console.log(currentTask)


  let allTaslBtn=document.querySelectorAll('.task button')
  allTaslBtn.forEach(btn=>{
    btn.addEventListener('click',(evt)=>{
      console.log(savedData)
      console.log(btn.id)
      console.log(currentTask[btn.id])

      currentTask.splice(currentTask[btn.id],1)
      renderTask()
    })
  })
}

renderTask();

