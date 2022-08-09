'use strict';


const createContainer = () => {
  const container = document.querySelector('.app-container');
  container.setAttribute('id', 'app');
  container.classList.add(
    'vh-100', 'w-100', 'd-flex', 'align-items-center',
    'justify-content-center', 'flex-column');
  return container;
};

const createTitle = title => {
  const h3 = document.createElement('h3');
  h3.textContent = 'Todo App';
  return h3;
};
const createButtonsGroup = params => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.className = className;
    button.textContent = text;
    return button;
  });
  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};
const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
  <label class="form-group me-3 mb-0">
    <input type = "text" class = "form-control" id = "task" 
    placeholder="ввести задачу" name = "task">
      </label>
  `);
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary me-3 mr-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-warning',
      type: 'button',
      text: 'Очистить',
    },
  ]);
  form.append(...buttonGroup.btns);
  return {form,
    btnSave: buttonGroup.btns[0],
    btnClear: buttonGroup.btns[1],
  };
};

const createTableWrapper = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');
  return tableWrapper;
};

const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
<tr>
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
`);
  table.append(thead);
  const tbody = document.createElement('tbody');
  table.append(tbody);
  table.tbody = tbody;
  return table;
};
const createHelloForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'active');

  const helloForm = document.createElement('form');
  helloForm.classList.add('overlay-modal');
  helloForm.insertAdjacentHTML('beforeend', `
  <h2 class = "form-title">
  Приветствую вас в ToDoApp!</h2>
  <h2 class =" form-title form-subtitle">
   Представьтесь, пожалуйста, в форме ниже:</h2>
    <div class= "form-group">
      <label class = "form-label" for="name"></label>
      <input class = "modal-input" name = "name"  
      id = "name" type = "text" required>
    </div>
    <button class="modal__submit" type="submit">
     Войти
    </button>
  `);
  const btnEnter = helloForm.querySelector('modal__submit');
  overlay.append(helloForm);
  const user = helloForm.querySelector('.modal-input').textContent;
  return {
    overlay,
    helloForm,
    btnEnter,
    user,
  };
};

const closeModal = () => {
  const overlay = document.querySelector('.overlay');
  overlay.classList.remove('active');
};


const createRow = ({task: text}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-light');

  const tdNumber = document.createElement('td');
  tdNumber.classList.add('table-number');


  const tdTask = document.createElement('td');
  tdTask.classList.add('table-task');
  tdTask.textContent = text;

  const tdStatus = document.createElement('td');
  tdStatus.classList.add('table-status');
  tdStatus.textContent = 'В процессе';

  const tdActions = document.createElement('td');
  tdActions.classList.add('table-action');
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-2',
      type: 'reset',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success',
      type: 'submit',
      text: 'Завершить',
    },
  ]);
  tdActions.append(...buttonGroup.btns);
  tr.append(tdNumber, tdTask, tdStatus, tdActions);

  return tr;
};

const getPersonData = (key) => {
  const dataBase = localStorage.getItem(`${key}`);
  console.log(dataBase);
  if (dataBase === null) {
    return JSON.stringify([]);
  } else return dataBase;
};

const setPersonData = (key, newTask, Object) => {
  const data = JSON.parse(getPersonData(`${key}`));
  console.log(typeof(data));
  data.push(newTask);
  localStorage.setItem(`${key}`, JSON.stringify(data));
};


const getUsersTask = (user) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === user) {
      const data = localStorage.getItem(`${user}`);
      return data;
    } else {
      localStorage.setItem(`${user}`, JSON.stringify([]));
    }
  }
};

const modalFormControl = (helloForm, closeModal, dataBase) => {
  helloForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = Object.fromEntries(formData);
    const user = newUser.name;
    const data = getUsersTask(user);
    console.log(typeof(data));
    localStorage.setItem('user', JSON.stringify(data));
    helloForm.reset();
    closeModal();
    return data;
  });
};
const removePersonData = task => {

};
 

const renderToDoList = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};

const addContactPage = (task, list) => {
  list.append(createRow(task));
};
const formControl = (form, list, btnSave, btnClear, user) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    addContactPage(newTask, list);
    const data = localStorage.getItem('user');
    console.log(data);
    data.push(newTask);
    console.log(data);
    form.reset();
  });
  form.addEventListener('keydown', e => {
    if (e.code === 13) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newTask = Object.fromEntries(formData);
      addContactPage(newTask, list);
      const data = JSON.parse(localStorage.getItem('user'));
      data.push(newTask);
      form.reset();
    }
  });
  btnClear.addEventListener('click', e => {
    form.reset();
  });
};
const renderToDoApp = (app) => {
  const {overlay, helloForm} = createHelloForm();
  const container = createContainer();
  const title = createTitle();
  container.append(title);

  const {form, btnClear, btnSave} = createForm();
  container.append(form);
  const tableWrapper = createTableWrapper();
  container.append(tableWrapper);
  const table = createTable();
  tableWrapper.append(table);
  container.append(overlay);


  return {
    list: table.tbody,
    form,
    overlay,
    helloForm,
    btnClear,
    btnSave,
  };
};
const init = (selectorApp) => {
  const app = document.querySelector(selectorApp);

  const {
    list,
    overlay,
    btnClear,
    btnSave,
    helloForm,
    form,
  } = renderToDoApp(app);
  modalFormControl(helloForm, closeModal);

  formControl(form, list, btnSave, btnClear);
  // renderToDoList(list, data);
};

init('#app');
