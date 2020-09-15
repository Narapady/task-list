// Selectors
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
// const submitBtn = document.querySelector("");
const clearBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");
const filterInput = document.querySelector("#filter");

loadEventListeners();
// Event Listeners
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getLocal);
  form.addEventListener("submit", addTask);
  clearBtn.addEventListener("click", clearTask);
  taskList.addEventListener("click", removeTask);
  filterInput.addEventListener("input", filterTask);
}

function getLocal() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    // Create list and append to collection
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.classList = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-times"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Enter the Task");
  }
  const item = taskInput.value;
  // Create list and append to collection
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(item));
  const link = document.createElement("a");
  link.classList = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-times"></i>';
  li.appendChild(link);
  taskList.appendChild(li);

  saveToLocal(taskInput.value);

  taskInput.value = "";
  e.preventDefault();
}

function clearTask(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    const taskItem = e.target.parentElement.parentElement;
    taskItem.remove();
    removeFromLocal(taskItem);
  }
}

function removeFromLocal(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
      if (taskItem.textContent === task) {
          tasks.splice(index, 1);
      }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTask(e) {
  const input = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll(".collection-item");
  tasks.forEach((task) => {
    if (task.textContent.toLowerCase().indexOf(input) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function saveToLocal(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
