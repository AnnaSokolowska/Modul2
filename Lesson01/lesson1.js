'use strict';
 

const className = document.getElementsByClassName('item');
const id = document.getElementById('item'); //выдаст только один элемент
const h1 = document.querySelector('h1'); // один элемент
const link = document.querySelectorAll('link');// все элементы с такими селекторами
const container = document.querySelector('.container');

const propsItems = container.querySelectorAll('.props__item');// все элементы
//getElementById работает только для документ
  const propsLists = document.querySelectorAll('.props__list');
  const propsItems = querySelectorAll('.props__item'); //получаем nodlist 
  //чтобы удалить элемент
  propsItems[2].remove();//udalili iz spiska na stranice, no v kollekcii ostalsia
  propsLists[1].append(propsItems[2]); //vstavit udalennyj element  v konec, no mozno i ne udaliat a srazu append pisac
  propsItems[0].prepend(propsLists[3]);//vstavit v naczalo
 // before after 
 propsItems[1].replaceWith(propsItems[4]);// zamena elementow

 const cloneElem = propsItems[2].cloneNode();//bez vlozennych elementv pustoj vnutri
 const clnelem = propsItems[2].cloneNode(true);//kloniruetsia czto vnutri
document.body.prepend(clnelem);
const elem = document.createElement('section')//sozdanie elementow
const li = document.createElement('section')
propsLists[0].append(li);//on pustoj
const text = document.createTextNode('12. New element');
li.append(text);//vstavka text