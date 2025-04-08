let keys = document.querySelectorAll(".key");
let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addTask");
let todoList = document.getElementById("todoList");
const clearBtn = document.getElementById("clearAllBtn");

function saveTasks() {
  const tasks = [];
  todoList.querySelectorAll("li").forEach(li => {
    tasks.push(li.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    todoList.appendChild(li);
  });
}

function addTask() {
  const task = input.value.trim();
  if (task !== "") {
    const li = document.createElement("li");
    li.textContent = task;
    todoList.appendChild(li);
    input.value = "";
    saveTasks(); // Save after adding
  }
}

// Virtual keyboard
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.textContent.trim();
    if (key.classList.contains("space")) {
      input.value += " ";
    } else if (key.classList.contains("backspace")) {
      input.value = input.value.slice(0, -1);
    } else if (key.classList.contains("enter")) {
      addTask();
    } else {
      input.value += value;
    }
  });
});

// Real keyboard
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key === " ") {
    event.preventDefault();
    input.value += " ";
  } else if (key === "Enter") {
    addTask();
  } else if (key === "Backspace") {
    event.preventDefault();
    input.value = input.value.slice(0, -1);
  } else if (key.length === 1) {
    input.value += key;
  }
});

// Clear all
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("tasks");
  todoList.innerHTML = "";
});

// Add with button
addBtn.addEventListener("click", addTask);

// Load tasks on refresh
window.addEventListener("load", loadTasks);
