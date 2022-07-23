"use strict";
(() => {
  const list = document.querySelector('.list');
  let listItemText;
  const enterLastItem = () => {
    const listItem = document.createElement('li');
    listItem.insertAdjacentText('beforeend', listItemText);
    listItem.className = 'list__item';
    list.appendChild(listItem);
  };
  const deleteLastItem = () => {
    list.removeChild(list.lastChild);
  };

  const clearItemsList = () => {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  };
  const start = () => {
    listItemText = (prompt('Введите строку')).trim();
    console.log(listItemText);
    if (!(listItemText === 'exit') && !(listItemText === null)) {
      if (listItemText === 'del') {
        deleteLastItem();
        alert('Последняя строка удалена');
        return start();
      }
      if (listItemText === 'clear') {
        clearItemsList();
        alert('Список очищен');
        return start();
      }
      if (listItemText === '') {
        return start();
      } else enterLastItem();
      return start();
    } else {
      return list;
    }
  };
  window.ask = start();
})();
