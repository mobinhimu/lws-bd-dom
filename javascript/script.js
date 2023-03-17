const form = document.querySelector("form");
const input = form.querySelector("input[type='text']");
const btn = form.querySelector("input[type='submit']");
const leftTaskList = document.querySelector(".left-task ul");
const rightTaskLIst = document.querySelector(".right-task ul");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let inputValue = input.value;

  if (inputValue === "") {
    alert("Please Enter Your Task 🤢!");
  } else {
    incompleteTask(inputValue);
  }
  input.value = "";
});

// incomplete task ==============
function incompleteTask(inputValue) {
  const uniqueID = Date.now();
  let list = document.createElement("li");
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  list.appendChild(checkbox);
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(inputValue));
  list.appendChild(span);
  list.setAttribute("id", `${uniqueID}`);
  leftTaskList.appendChild(list);
  // all function
  deleteData();
  incompleteTaskLS(inputValue, uniqueID);
}
// local storage
function incompleteTaskLS(inputValue, uniqueID) {
  let itLS = localStorage.getItem("itLS");
  if (itLS === null) {
    itLS = [];
  } else {
    itLS = JSON.parse(localStorage.getItem("itLS"));
  }
  itLS.push({ inputValue, uniqueID });
  localStorage.setItem("itLS", JSON.stringify(itLS));
}

function deleteData() {
  const list = document.querySelectorAll("li input[type='checkbox']");
  Array.from(list).map((checkbox) => {
    checkbox.addEventListener("click", (eve) => {
      if (checkbox.checked) {
        eve.target.parentElement.remove();
        const d = JSON.parse(localStorage.getItem("itLS")).filter((item) => {
          return parseInt(eve.target.parentElement.id) !== item.uniqueID;
        });
        localStorage.setItem("itLS", JSON.stringify(d));
        completeTask(eve.target.parentElement);
      }
    });
  });
}

// showing task
window.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("itLS"));
  const list = data
    .map((list) => {
      return `<li id="${list.uniqueID}"><input type="checkbox"><span>${list.inputValue}</span></li>`;
    })
    .join("");
  leftTaskList.innerHTML = list;
  deleteData();
});
// adding completing task ==============
function completeTask(element) {
  element.children[0].remove();
  let button = document.createElement("button");
  button.appendChild(document.createTextNode("delete"));
  element.appendChild(button);
  rightTaskLIst.appendChild(element);
  completeDeleteData();
  completeTaskLS(element.children[0].textContent, element.id);
}
// local storage
function completeTaskLS(inputValue, uniqueID) {
  let comLS = localStorage.getItem("comLS");
  if (comLS === null) {
    comLS = [];
  } else {
    comLS = JSON.parse(localStorage.getItem("comLS"));
  }
  comLS.push({ inputValue, uniqueID });
  localStorage.setItem("comLS", JSON.stringify(comLS));
}

function completeDeleteData() {
  const list = document.querySelectorAll("li button");
  Array.from(list).map((checkbox) => {
    checkbox.addEventListener("click", (eve) => {
      if (eve.target) {
        eve.target.parentElement.remove();
        const d = JSON.parse(localStorage.getItem("comLS")).filter((item) => {
          console.log(eve.target.parentElement.id);
          console.log(item.uniqueID);
          return eve.target.parentElement.id !== item.uniqueID;
        });
        localStorage.setItem("comLS", JSON.stringify(d));
      }
    });
  });
}

// showing task
window.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("comLS"));
  const list = data
    .map((list) => {
      return `<li id = "${list.uniqueID}">${list.inputValue} <button>delete</button></li>`;
    })
    .join("");
  rightTaskLIst.innerHTML = list;
  deleteData();
  completeDeleteData();
});
