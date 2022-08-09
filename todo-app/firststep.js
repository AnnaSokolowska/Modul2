
import * as createElement from './modules/createElement.js';
import * as serviceStorage from './modules/serviceStorage.js';

import * as othersFunction from './modules/other.js';


const {createContainer, createTitle, createForm, createTableWrapper,
  createTable, createRow} = createElement;

const {getUserName, getInput, setCellNumber} = othersFunction;

const {getStorage, setStorage, removeStorage} = serviceStorage;
const addContactPage = (task, list) => {
  list.append(createRow(task));
};


const formControl = (form, list, btnSave, btnClear, user) => {
  const input = getInput();
  input.addEventListener('change', e => {
    btnSave.classList.toggle('disabled');
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    console.log(newTask);
    const id = Math.random().toString().substring(2, 10);
    newTask.id = id;
    const status = form.querySelector('select').value;
    newTask.status = status;
    newTask.process = 'В процессе';
    newTask.textStyle = 'task';
    addContactPage(newTask, list);
    setStorage(user, newTask);
    const data = JSON.parse(getStorage(`${user}`));
    const tableCellNumber = list.querySelectorAll('.table-number');
    for (let i = 0; i < data.length; i++) {
      tableCellNumber[i].textContent = `${i + 1}`;
    }
    form.reset();
    btnSave.classList.toggle('disabled');
  });
  form.addEventListener('keydown', e => {
    if (e.code === 13) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newTask = Object.fromEntries(formData);
      const id = Math.random().toString().substring(2, 10);
      newTask.id = id;
      const status = form.querySelector('select').value;
      newTask.status = status;
      newTask.process = 'В процессе';
      newTask.textStyle = '';
      addContactPage(newTask, list);
      setStorage(user, newTask);
      const data = JSON.parse(getStorage(`${user}`));
      const tableCellNumber = list.querySelectorAll('.table-number');
      for (let i = 0; i < data.length; i++) {
        tableCellNumber[i].textContent = `${i + 1}`;
      }
      form.reset();
      btnSave.classList.toggle('disabled');
    }
  });
  btnClear.addEventListener('click', e => {
    form.reset();
    btnSave.classList.toggle('disabled');
  });
};

const confirmDelete = () => {
  const con = confirm('Вы уверены, что хотите удалить эту задачу?');
  return con;
};

const deleteControl = (list, data, user) => {
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-danger')) {
      const con = confirmDelete();
      if (con === true) {
        const id = target.closest('.table-row').getAttribute('id');
        console.log(id);
        target.closest('.table-row').remove();
        removeStorage(id, user, data);
        const tableCellNumber = list.querySelectorAll('.table-number');
        for (let i = 0; i < data.length; i++) {
          tableCellNumber[i].textContent = `${i + 1}`;
        }
      }
    }
  });
};


const getEndControl = (list, data, user) => {
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-success')) {
      const row = target.closest('.table-row');
      const id = row.getAttribute('id');
      localStorage.setItem('idDone', `${id}`);
      row.classList.remove('table-light', 'table-danger', 'table-warning');
      row.classList.add('table-success');
      const cell = row.querySelector('.table-task');
      cell.classList.add('text-decoration-line-through');
      const cellStatus = row.querySelector('.table-status');
      cellStatus.textContent = 'Выполнена';
    }
    const id = localStorage.getItem('idDone');
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i].status = 'table-success';
        data[i].process = 'Выполнена';
        data[i].textStyle = 'text-decoration-line-through';
        localStorage.setItem(`${user}`, JSON.stringify(data));
      }
    }
  });
};

const changeTask = (data, user) => {
  const id = localStorage.getItem('idchange');
  const row = document.getElementById(`${id}`);
  const task = row.querySelector('.table-task').textContent;
  console.log(task);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      data[i].task = `${task}`;
    }
  }
  localStorage.setItem(`${user}`, JSON.stringify(data));
};

const getEdit = (list, data, user) => {
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-primary')) {
      const row = target.closest('.table-row');
      const cell = row.querySelector('.table-task');
      cell.setAttribute('contenteditable', 'true');
    }
    const row = target.closest('.table-row');
    const id = row.getAttribute('id');
    const cell = row.querySelector('.table-task');
    localStorage.setItem('idchange', `${id}`);
    cell.addEventListener('mouseleave', e => {
      changeTask(data, user);
    });
  });
};


const renderToDoList = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  setCellNumber(data, elem);
  return allRow;
};


const renderToDoApp = (app) => {
  const container = createContainer();
  const title = createTitle();
  container.append(title);

  const {form, btnClear, btnSave} = createForm();
  container.append(form);
  const tableWrapper = createTableWrapper();
  container.append(tableWrapper);
  const table = createTable();
  tableWrapper.append(table);
  return {
    list: table.tbody,
    form,
    btnClear,
    btnSave,
  };
};


const init = (selectorApp) => {
  const app = document.querySelector(selectorApp);
  const user = getUserName();
  const {
    list,
    btnClear,
    btnSave,
    form,
  } = renderToDoApp(app);
  const data = JSON.parse(getStorage(`${user}`));
  console.log(data);
  renderToDoList(list, data);
  formControl(form, list, btnSave, btnClear, user);
  deleteControl(list, data, user);
  getEndControl(list, data, user);
  setCellNumber(data, list);
  getEdit(list, data, user);
};

init('#app');
