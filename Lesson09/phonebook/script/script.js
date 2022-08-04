import * as serviceStorage from './modules/serviceStorage.js';
import {createRow, renderPhoneBook, renderContacts} from './modules/render.js';
import hoverRow from './modules/modalControls.js';


{
  const {getStorage, setStorage, removeStorage} = serviceStorage;

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };
    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal();
      }
    });
    return {
      closeModal,
    };
  };
  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', e => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
        const tel = target.closest('.contact').querySelector('a').textContent;
        removeStorage(tel);
      }
    });
  };
  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };
  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list);
      setStorage(newContact);
      form.reset();
      closeModal();
    });
  };
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel} = renderPhoneBook(app, title);

    // функционал
    const data = JSON.parse(getStorage('contacts'));
    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  init('#app', 'Анна');
}

