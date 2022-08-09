
export const getStorage = (key) => {
  const dataBase = localStorage.getItem(`${key}`);
  if (dataBase === null) {
    return JSON.stringify([]);
  } else return dataBase;
};

export const setStorage = (key, newTask, Object) => {
  const data = JSON.parse(getStorage(`${key}`));
  data.push(newTask);
  console.log(data);
  localStorage.setItem(`${key}`, JSON.stringify(data));
};

export const removeStorage = (id, user, data) => {
  data.forEach(item => {
    if (item.id === id) {
      const delIndex = data.indexOf(item);
      console.log(delIndex);
      data.splice(delIndex, 1);
    }
    localStorage.setItem(`${user}`, JSON.stringify(data));
  });
};


