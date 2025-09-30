let sub = document.querySelector(".user-info button");
let userName = document.getElementsByName("user-name")[0];
let gender = document.querySelector(".user-info select");
let userInfo = document.querySelector(".user-info");
let helloDiv = document.querySelector(".hello-name");
let hellop = document.querySelector(".hello-name + p");
let arrow = document.querySelector(".hello .arrow");
let sound = document.querySelectorAll("audio");
arrow.addEventListener("click", () => {
  arrow.classList.toggle("rotate");
  hellop.classList.toggle("hidden");
});

function WriteUserInfo(user) {
  if (user.gender === "male") {
    helloDiv.innerHTML = `Hello MR. ${user.userName}`;
  } else {
    helloDiv.innerHTML = `Hello MS. ${user.userName}`;
  }
  userInfo.style.display = "none";
}

sub.addEventListener("click", (e) => {
  e.preventDefault();
  if (userName.value !== "") {
    localStorage.setItem(
      "user",
      JSON.stringify({ userName: userName.value, gender: gender.value })
    );
    let userInJson = localStorage.getItem("user");
    let user = JSON.parse(userInJson);
    WriteUserInfo(user);
  }
});
window.addEventListener("load", function () {
  let userInJson = localStorage.getItem("user");
  if (userInJson) {
    let user = JSON.parse(userInJson);
    WriteUserInfo(user);
  }
  // ======================
  let jsonData = localStorage.getItem("tasks");
  if (jsonData) {
    showTasks(JSON.parse(jsonData));
  }
});

// ==== App ====
//switch-container
let switchList = document.querySelectorAll(".switch-container .switch");
let switchNow = "task";
function removeActive() {
  switchList.forEach((e) => {
    e.classList.remove("active");
  });
  this.classList.add("active");
  switchNow = this.dataset.switch.toLowerCase();
  console.log(switchNow);
  let jsonData = localStorage.getItem("tasks");
  if (jsonData) {
    showTasks(JSON.parse(jsonData));
  }
}
switchList.forEach((el) => {
  el.addEventListener("click", removeActive);
});
window.addEventListener("load", function () {
  switchList.forEach((el) => {
    function hiddenEl() {
      let task = Array.from(document.querySelectorAll(".tasks .task"));
      task.forEach((e) => {
        e.style.display = "none";
      });
    }

    el.addEventListener("click", hiddenEl);
    el.addEventListener("click", (e) => {
      let task = Array.from(document.querySelectorAll(".tasks .task"));
      let show = task.filter((f) => {
        return f.classList.contains(e.target.dataset.switch);
      });
      show.forEach((sh) => {
        sh.style.display = "flex";
      });
    });
  });
});

//switch-container-scroll
const container = document.querySelector(".switch-container");
function adjustAlignment() {
  if (container.scrollWidth > container.clientWidth) {
    container.style.justifyContent = "flex-start";
  } else {
    container.style.justifyContent = "center";
  }
}
adjustAlignment();
window.addEventListener("resize", adjustAlignment);
// groups
let selectBox = document.querySelector(".inputs-holder select");
for (let i = 1; i < switchList.length; i++) {
  let op = document.createElement("option");
  op.value = switchList[i].innerHTML;
  op.innerHTML = switchList[i].innerHTML;
  selectBox.appendChild(op);
}
let group = document.querySelector(".inputs-holder select");
let groupName = "day";
group.addEventListener("change", function () {
  groupName = this.value.toLowerCase();
});
let plusGroup = document.querySelector(".switch-container i");
let plusGroupInput = document.querySelector(".switch-container input");
plusGroup.addEventListener("click", () =>
  plusGroupInput.classList.toggle("hidden")
);
let plusBtn = document.querySelector(".switch-container .plus-group-btn")
// Show
let tasks = document.querySelector(".tasks");
let addBtn = document.querySelector(".add-task");
let input = document.getElementsByName("input-value")[0];
let saveTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks(tasksInJson) {
  tasks.innerHTML = "";
  console.log(tasksInJson);
  if (tasksInJson.length > 0) {
    tasks.style.backgroundColor = "var(--main-color)";
    for (let i = 0; i < tasksInJson.length; i++) {
      if (tasksInJson[i].groupName === switchNow || switchNow === "task") {
        // Creat Elements
        let task = document.createElement("div");
        task.className = "task";
        task.classList.add(tasksInJson[i].groupName);
        task.setAttribute("id", i);
        let span = document.createElement("span");
        let doneBtn = document.createElement("button");
        doneBtn.innerHTML = "Done";

        //  Append
        tasks.appendChild(task);
        span.innerHTML = tasksInJson[i].taskText;
        task.appendChild(span);
        task.appendChild(doneBtn);
      } else {
        continue;
      }
      // console.log("tasksInJson[i].groupName = " + tasksInJson[i].groupName);
      // console.log("switchNow = " + switchNow);
    }
  }
}
// Remove Task
tasks.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
    let taskIndex = parseInt(e.target.parentElement.getAttribute("id"));
    saveTasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(saveTasks));
    showTasks(saveTasks);
    sound[0].currentTime = 0;
    sound[0].play();
  }
  if (tasks.children.length === 0) {
    tasks.style.backgroundColor = "transparent";
  }
});
// Add
function addTask(e) {
  e.preventDefault();
  if (input.value !== "") {
    saveTasks.push({
      taskText: input.value,
      groupName: groupName,
    });
    localStorage.setItem("tasks", JSON.stringify(saveTasks));
    let jsonData = localStorage.getItem("tasks");
    showTasks(JSON.parse(jsonData));
    input.value = "";
    sound[1].currentTime = 0;
    sound[1].play();
  }
}
addBtn.addEventListener("click", addTask);
// Clear
let clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
  // localStorage.clear();
  // location.reload();
  localStorage.removeItem("tasks");
  saveTasks = [];
  tasks.innerHTML = "";
  tasks.style.backgroundColor = "transparent";
});

let copy = document.querySelector(".copy");
copy.innerHTML = new Date().getFullYear();
