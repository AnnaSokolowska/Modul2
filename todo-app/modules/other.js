
export const getUserName = () => {
  const userName = (prompt(
    'Приветствую вас в ToDoApp!Представьтесь, пожалуйста.'));
  const user = userName.toLocaleLowerCase();
  return user;
};


export const getInput = () => {
  const input = document.querySelector('#task');
  return input;
};


export const setCellNumber = (data, list) => {
  const tableCellNumber = list.querySelectorAll('.table-number');
  for (let i = 0; i < data.length; i++) {
    tableCellNumber[i].textContent = `${i + 1}`;
  }
};

