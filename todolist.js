const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');

const TODOLIST_LS = 'toDos',
  TODOLIST = 'js-toDoList';

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = toDos.filter(function (toDo) {
    console.log(toDo.id, parseInt(li.id));
    return toDo.id !== parseInt(li.id);
  });
  console.log(cleanToDo);
  toDos = cleanToDo;
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(TODOLIST_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const delbtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  li.className = 'toDoContainer';
  delbtn.className = 'deleteToDo';
  delbtn.addEventListener('click', deleteToDo);
  delbtn.innerHTML = '✖︎';
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delbtn);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDo();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentToDo = toDoInput.value;
  paintToDo(currentToDo);
  toDoInput.value = '';
}

function loadDos() {
  const loadedToDos = localStorage.getItem(TODOLIST_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
