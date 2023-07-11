'use strict';

// gọi đển các class/ID bên file HTML

const submitBtn = document.getElementById('submit-btn');
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
document
  .querySelector('body')
  .addEventListener('load', renderTableData(petArr));

submitBtn.addEventListener('click', function () {
  //lấy dữ liệu từ người dùng

  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //Kiểm tra dữ liệu
  const validate = validateData(data);
  function validateData() {
    let validate = true;

    if (data.name.trim() === '') {
      alert('Could not be void Name !');
      validate = false;
    }
    //kiểm tra dữ liệu có phải là một số hay không
    if (isNaN(data.age)) {
      alert('Could not be void Age !');
      validate = false;
    } else if (data.age > 15 || data.age < 1) {
      alert('Age must be between 1 and 15!');
      validate = false;
    }
    if (isNaN(data.weight)) {
      alert('Could not be void Weight !');
      validate = false;
    } else if (data.weight > 15 || data.weight < 1) {
      alert('Weight must be between 1 and 15!');
      validate = false;
    }
    if (isNaN(data.length)) {
      alert('Could not be void Length !');
      validate = false;
    } else if (data.length > 100 || data.length < 1) {
      alert('Length must be between 1 and 100!');
      validate = false;
    }
    //kiểm tra người dùng chọn loài hay chưa
    if (data.type === 'Select Type') {
      alert('Please select Type!');
      validate = false;
    }
    //kiểm tra người dùng chọn giống hay chưa
    if (data.breed === 'Select Breed') {
      alert('Please select Breed!');
      validate = false;
    }
    // trả về giá trị biến kiểm tra dữ liệu
    return validate;
  }
  // nếu validate đúng thì chạy các dòng dưới
  if (validate) {
    //lấy index của pet cần chỉnh sửa
    const index = petArr.findIndex((petEdit) => petEdit.id === data.id);

    petArr[index] = data;
    saveToStorage(key, petArr);
    clearInput();
    renderTableData(petArr);
    formEl.classList.add('hide');
  }
});
//tạo function chạy các dòng code để xóa các input, đưa các giá trị về bạn đầu
function clearInput() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = ' Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#000000';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
//tạo func hiện thị dữ liệu cho người dùng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ''; //Xóa nội dung của bảng
  petArr.forEach((pet, index) => {
    pet.date = new Date(pet.date);
    const row = document.createElement('tr'); //tạo một thẻ tr
    row.innerHTML = ` <th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td >${pet.type}</td>
    <td>${pet.weight}kg</td>
    <td>${pet.length}cm</td>
    <td>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color:${pet.color}"></i>
    </td>
    <td><i class="bi ${
      pet.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    } "></i></td>
    <td><i class="bi ${
      pet.dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td><i class="bi ${
      pet.sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
<td>${pet.date.getDate()}/${
      pet.date.getMonth() + 1
    }/${pet.date.getFullYear()}</td>
    <td>
      <button class="btn btn-danger" onclick="edit('${index}')" >Edit</button>
    </td>`;
    tableBodyEl.appendChild(row);
  });
}
//Hiển thị breed đúng theo giá trị type mà người dùng chọn, onchange, nhận dữ liệu ngày lập tức
function renderBreed() {
  const breedDogs = breedArr.filter((a) => a.type === 'Dog');
  const breedCats = breedArr.filter((a) => a.type === 'Cat');
  breedInput.innerHTML = '<option>Select Breed</option>';
  let breed = typeInput.value;

  if (breed === 'Dog') {
    breedDogs.forEach(function (a) {
      const option = document.createElement('option');
      option.innerHTML = `<option>${a.name}</option>`;
      breedInput.appendChild(option);
    });
  }
  if (breed === 'Cat') {
    breedCats.forEach(function (a) {
      const option = document.createElement('option');
      option.innerHTML = `<option>${a.name}</option>`;
      breedInput.appendChild(option);
    });
  }
}
//đưa các dữ liệu lên ô input khi người dùng nhấn vào edit
function edit(index) {
  formEl.classList.remove('hide');
  const petEdit = petArr[index];

  idInput.value = petEdit.id;
  nameInput.value = petEdit.name;
  ageInput.value = petEdit.age;
  typeInput.value = petEdit.type;
  weightInput.value = petEdit.weight;
  lengthInput.value = petEdit.length;
  colorInput.value = petEdit.color;
  breedInput.value = petEdit.breed;
  vaccinatedInput.checked = petEdit.vaccinated;
  dewormedInput.checked = petEdit.dewormed;
  sterilizedInput.checked = petEdit.sterilized;
  renderBreed();
}
