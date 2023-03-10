let btnAdd = document.getElementById("btn-add");
let inpTask = document.getElementById("inp-task");
let allTaskBoxs = document.querySelectorAll(".tasks");
let storage = localStorage.getItem("alltasks");
let drag = null;

//
let taskInStart,
  taskInProgess,
  taskCompleted = [];
let taskForLocal;
//

if (localStorage.getItem("alltasks")) {
  let alltasks = JSON.parse(storage);
  allTaskBoxs[0].innerHTML = alltasks[0];
  allTaskBoxs[1].innerHTML = alltasks[1];
  allTaskBoxs[2].innerHTML = alltasks[2];
  dragItem();
}

btnAdd.onclick = function addTask(e) {
  e.preventDefault();
  if (inpTask.value !== "") {
    allTaskBoxs[0].innerHTML += `
    <div class="task" draggable="true">
        <h3>${inpTask.value}</h3>
        <div class="btn-container">
            <button class="btn-delete"onClick="dele(this)">Delete</button>
        </div>
    </div>`;
  }
  inpTask.value = "";
  // for handel localStorage
  addTasksTolocal();
  dragItem();
};
//

function dragItem() {
  let tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    task.addEventListener("dragstart", () => {
      drag = task;
      task.style.opacity = "0.5";
      addTasksTolocal();
    });

    task.addEventListener("dragend", () => {
      drag = null;
      task.style.opacity = "1";
      addTasksTolocal();
    });

    allTaskBoxs.forEach((box) => {
      box.addEventListener("dragover", (e) => {
        e.preventDefault();
        box.style.background = "#fff";
      });
      box.addEventListener("dragleave", () => {
        box.style.background = "#2b2c31";
      });
      box.addEventListener("drop", () => {
        box.appendChild(drag);
        box.style.background = "#2b2c31";
        //
        addTasksTolocal();
      });
    });
  });
}
function addTasksTolocal() {
  taskInStart = allTaskBoxs[0].innerHTML;
  taskInProgess = allTaskBoxs[1].innerHTML;
  taskCompleted = allTaskBoxs[2].innerHTML;
  taskForLocal = [taskInStart, taskInProgess, taskCompleted];
  localStorage.setItem("alltasks", JSON.stringify(taskForLocal));
}
function dele(btn) {
  btn.parentElement.parentElement.remove();
  addTasksTolocal();
}
function clearAll() {
  localStorage.clear();
  allTaskBoxs.forEach((tasksC) => (tasksC.innerHTML = ""));
}
