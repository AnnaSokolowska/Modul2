

export const createContainer = () => {
  const container = document.querySelector('.app-container');
  container.setAttribute('id', 'app');
  container.classList.add(
    'vh-100', 'w-100', 'd-flex', 'align-items-center',
    'justify-content-center', 'flex-column');
  return container;
};

export const createTitle = title => {
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
export const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  form.insertAdjacentHTML('beforeend', `
      <label class="form-group me-3 mb-0">
        <input type = "text" class = "form-control" id = "task" 
        placeholder="ввести задачу" name = "task" required>
          </label>
  
      <select id="status" class = "me-3  select">
      <option value="table-light">-- status --</option>
      <option value="table-light">обычная</option>
      <option value="table-warning">важная</option>
      <option value="table-danger">срочная</option>
      `);
  const buttonGroup = createButtonsGroup([

    {
      className: 'btn btn-primary me-3 mr-3 disabled',
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

export const createTableWrapper = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');
  return tableWrapper;
};

export const createTable = () => {
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
export const createRow = ({task: text, id, status, process, textStyle}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-row');
  tr.setAttribute('id', id);
  tr.classList.add(`${status}`);

  const tdNumber = document.createElement('td');
  tdNumber.classList.add('table-number');

  const tdTask = document.createElement('td');
  tdTask.classList.add('table-task', textStyle);
  tdTask.textContent = text;

  const tdStatus = document.createElement('td');
  tdStatus.classList.add('table-status');
  tdStatus.textContent = process;

  const tdActions = document.createElement('td');
  tdActions.classList.add('table-action');
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-2',
      type: 'reset',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success me-2',
      type: 'submit',
      text: 'Завершить',
    },
    {
      className: 'btn btn-primary ',
      type: 'submit',
      text: 'Редактировать',
    },
  ]);
  tdActions.append(...buttonGroup.btns);
  tr.append(tdNumber, tdTask, tdStatus, tdActions);

  return tr;
};

