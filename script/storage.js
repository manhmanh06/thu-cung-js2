'use strict';

const sidebarEl = document.getElementById('sidebar');

// bắt sự kiện click sidebar
sidebarEl.addEventListener('click', function (e) {
  this.classList.toggle('active');
});

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}
const breed = 'breedArr';

const breedArr = localStorage.getItem(breed)
  ? JSON.parse(getFromStorage(breed))
  : [];
const key = 'petArr';

const petArr = localStorage.getItem(key) ? JSON.parse(getFromStorage(key)) : [];
const breed1 = {
  name: 'Chó Đốm',
  type: 'Dog',
};
const breed2 = {
  name: 'Mèo Mun',
  type: 'Cat',
};

const data1 = {
  id: 'P001',
  name: 'Tom',
  age: 3,
  type: 'Cat',
  weight: 5,
  length: 50,
  color: '#fff',
  breed: 'Persian',
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
  // BMI: '?',
};
const data2 = {
  id: 'P002',
  name: 'Tyke',
  age: 3,
  type: 'Dog',
  weight: 5,
  length: 50,
  color: '#ccc',
  breed: 'Tabby',
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(),
};

if (!getFromStorage(breed)) {
  saveToStorage(breed, [breed1, breed2]);
}
if (!getFromStorage(key)) {
  saveToStorage(key, [data1, data2]);
}
