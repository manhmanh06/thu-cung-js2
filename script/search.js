'use strict';

const findBtn = document.getElementById('find-btn');
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const healthyBtn = document.getElementById('healthy-btn');
const bmiBtn = document.getElementById('BMI-btn');

const tableBodyEl = document.getElementById('tbody');
//tại Arr lưu trữ các object chứa các pet
const formEl = document.getElementById('container-form');

function finde() {
  let petsFind = petArr;
  if (nameInput.value) {
    petsFind = petsFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  if (idInput.value) {
    petsFind = petsFind.filter((pet) => pet.id.includes(idInput.value));
  }
  if (typeInput.value !== 'Select Type') {
    petsFind = petsFind.filter((pet) => pet.type === typeInput.value);
  }
  if (breedInput.value !== 'Select Breed') {
    petsFind = petsFind.filter((pet) => pet.breed === breedInput.value);
  }
  if (vaccinatedInput.value === true) {
    petsFind = petsFind.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInput.value === true) {
    petsFind = petsFind.filter((pet) => pet.dewormed === true);
  }
  if (sterilizedInput.value === true) {
    petsFind = petsFind.filter((pet) => pet.sterilized === true);
  }
  renderTableData(petsFind);
}

function renderTableData(petArr) {
  tableBodyEl.innerHTML = ''; //Xóa nội dung của bảng
  for (let i = 0; i < petArr.length; i++) {
    //để có thể hiển thị được ngày

    petArr[i].date = new Date(petArr[i].date);

    const row = document.createElement('tr'); //tạo một thẻ tr
    row.innerHTML = ` <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td >${petArr[i].type}</td>
    <td>${petArr[i].weight}kg</td>
    <td>${petArr[i].length}cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color:${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    } "></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
<td>${petArr[i].date.getFullYear()}/${petArr[i].date.getMonth() + 1}/${petArr[
      i
    ].date.getDate()}</td>
    
   `;
    tableBodyEl.appendChild(row);
  }
}

function renderBreed() {
  const breedDogs = breedArr.filter((breed) => breed.type === 'Dog');
  const breedCats = breedArr.filter((breed) => breed.type === 'Cat');

  breedInput.innerHTML = `<option>Select Breed</option>`;
  //Lấy dữ liệu khi người dùng chọn type
  let breed = typeInput.value;
  if (breed === 'Select Type') {
    breedArr.forEach(function (breed) {
      const option = document.createElement('option');
      option.innerHTML = `<option>${breed.name}</option>`;
      breedInput.appendChild(option);
    });
  }
  
  if (breed === 'Dog') {
    breedDogs.forEach(function (breed) {
      const option = document.createElement('option');
      option.innerHTML = `<option>${breed.name}</option>`;
      breedInput.appendChild(option);
    });
  }
  if (breed === 'Cat') {
    breedCats.forEach(function (breed) {
      const option = document.createElement('option');
      option.innerHTML = `<option>${breed.name}</option>`;
      breedInput.appendChild(option);
    });
  }
}
renderBreed();
