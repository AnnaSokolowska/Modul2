'use strict';
const list = document.querySelector('.items');

const listItem = document.querySelectorAll('.item');

list.prepend(listItem[3]);
list.prepend(listItem[2]);
list.prepend(listItem[1]);

const h2 = document.querySelectorAll('.item__title');

const listItemSec = document.querySelectorAll('.props__item_two');

const listItemFour = document.querySelectorAll('.props__item_four');
const listItemFive = document.querySelectorAll('.props__item_five');


h2[4].replaceWith(h2[0]);
listItemSec[0].prepend(h2[3]);
listItemFive[0].prepend(h2[4]);
listItemFour[4].prepend(listItemFour[0]);
const propsList = document.querySelectorAll('.props__list');
const div = document.querySelectorAll('.content');

propsList[4].replaceWith(propsList[2]);
h2[1].remove();

const newTitle = document.createElement('h2');
const titleText = document.createTextNode('This  и прототипы объектов');
const perenos = document.createElement('br');

newTitle.append(titleText);
div[2].append(newTitle);
div[2].append(perenos);
div[2].append(propsList[4]);
div[1].append(listItemSec[8]);
div[1].append(listItemSec[9]);
const adds = document.querySelector('.ads');
adds.remove();

