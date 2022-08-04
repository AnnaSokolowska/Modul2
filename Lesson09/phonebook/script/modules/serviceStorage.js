

export const getStorage = (key) => {
  const dataBase = localStorage.getItem(`${key}`);
  if (dataBase === null) {
    return JSON.stringify([]);
  } else return dataBase;
};

export const setStorage = (newContact, Object) => {
  const data = JSON.parse(getStorage('contacts'));
  data.push(newContact);
  console.log(data);
  localStorage.setItem('contacts', JSON.stringify(data));
};

export const removeStorage = (tel) => {
  const telef = tel.substring(1);
  const data = JSON.parse(getStorage('contacts'));
  data.forEach(item => {
    if (item.phone === telef) {
      const delIndex = data.indexOf(item);
      data.splice(delIndex, 1);
    }
    localStorage.setItem('contacts', JSON.stringify(data));
  });
};
