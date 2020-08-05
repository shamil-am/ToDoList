const ulList = document.querySelector("#todoList");
const input = document.querySelector("#newTodo");
const searchInput = document.querySelector("#searchTodo");

document.addEventListener("DOMContentLoaded", () => {
  let todosfromLocalStorage = JSON.parse(localStorage.getItem("todos"));
  if (todosfromLocalStorage === null) return;
  todosfromLocalStorage.forEach((todo) => {
    ulList.appendChild(fnCreateNewTodo(todo));
  });
});

document.querySelector("#todoInsertForm").addEventListener("submit", () => {
  let value = input.value;
  if (value.length < 1) {
    if (document.querySelector(".alert.alert-danger") !== null) return;
    let alert = fnCreateAlert("danger", "Boş todo əlavə edilə bilməz.");
    document.querySelector("#listDiv").prepend(alert);
    setTimeout(() => {
      alert.remove();
    }, 1000);
    return;
  }
  let alert = fnCreateAlert(
    "success",
    `<strong> ${value} </strong> - əlavə edilidi.`
  );
  document.querySelector("#listDiv").prepend(alert);
  setTimeout(() => {
    alert.remove();
  }, 1000);
  ulList.prepend(fnCreateNewTodo(value));
  fnAddToLocalStorage(value);

  input.value = "";
});

searchInput.addEventListener("keyup", (e) => {
  let searchWord = searchInput.value;
  let allTodo = JSON.parse(localStorage.getItem("todos"));
  allTodo.forEach((todo, index) => {
    if (!todo.toLowerCase().includes(searchWord.toLowerCase())) {
        let notHas = document.querySelector(`#todoList > li:nth-child(${index + 1})`);
        notHas.className = "d-none";
    }else{
        let notHas = document.querySelector(`#todoList > li:nth-child(${index + 1})`);
        notHas.className = "list-group-item d-flex justify-content-between";
    }
  });
});

//functions

function fnCreateNewTodo(todo) {
  let li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  let a = document.createElement("a");
  a.href = "#";
  a.className = "btndelete text-danger";
  a.innerHTML = "<i class='far fa-trash-alt'></i>";
  a.addEventListener("click", (e) => {
    e.preventDefault();
    fnDeleteFromStorage(todo);
    let alert = fnCreateAlert(
      "warning",
      `<strong> ${todo} </strong> - siyahıdan silindi.`
    );
    document.querySelector("#listDiv").prepend(alert);
    setTimeout(() => {
      alert.remove();
    }, 1000);
    li.remove();
  });
  li.textContent = todo;
  li.appendChild(a);
  return li;
}
function fnAddToLocalStorage(todo) {
  let arr;
  if (localStorage.getItem("todos") === null) {
    arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("todos"));
  }
  arr.unshift(todo);
  localStorage.setItem("todos", JSON.stringify(arr));
}
function fnCreateAlert(type, message) {
  let alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = message;

  return alertDiv;
}
function fnDeleteFromStorage(content) {
  let todosArr = JSON.parse(localStorage.getItem("todos"));
  todosArr.forEach((element, index) => {
    if (element === content) {
      todosArr.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todosArr));
}
