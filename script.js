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

document
  .querySelector('body')
  .addEventListener('load', renderTableData(petArr));
// getFromStorage(key);

//lắng nghe sự kiện click vào submit
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
    //tạo vòng lặp qua mảng để kiểm tra Id trùng
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === data.id) {
        alert('Trùng ID');
        validate = false;
        break;
      }
    }
    // kiểm tra dữ liệu , không thõa mãn hiện thông báo cho người dùng
    if (data.id.trim() === '') {
      alert('Could not be void Id !');
      validate = false;
    }
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
    //kiểm tra người dùng nhập dữ liệu đúng hay chưa,
    if (isNaN(data.length)) {
      alert('Could not be void Length !');
      validate = false;
    } else if (data.length > 100 || data.length < 1) {
      alert('Length must be between 1 and 100!');
      validate = false;
    }
    if (data.type === 'Select Type') {
      alert('Please select Type!');
      validate = false;
    }
    if (data.breed === 'Select Breed') {
      alert('Please select Breed!');
      validate = false;
    }
    // trả về giá trị biến kiểm tra dữ liệu
    return validate;
  }
  // nếu validate đúng thì chạy các dòng dưới
  if (validate) {
    petArr.push(data);
    saveToStorage(key, petArr);
    clearInput();
    renderTableData(petArr);
  }
});
//tạo function chạy các dòng code để xóa các input, đưa các giá trị về ban đầu
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

//Hiển thị danh sách thú cưng
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
<td>${petArr[i].date.getDate()}/${petArr[i].date.getMonth() + 1}/${petArr[
      i
    ].date.getFullYear()}</td>
    <td>
      <button class="btn btn-danger" onclick="deletePet('${
        petArr[i].id
      }')">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}
//Xóa Pet
const deletePet = (petId) => {
  // xác nhận trước khi xóa, nếu ok , thực hiện các dòng dưới để xóa pet
  if (confirm('Are you sure?')) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage(key, petArr);
        renderTableData(petArr);
      }
    }
  }
};

// Show healthy
// một biến dùng để kiểm tra xem hiện tại đang hiển thị tất cả thú cưng hay là chỉ thú cưng khỏe mạnh.
let healthyCheck = false;
//Sự kiện click
healthyBtn.addEventListener('click', function () {
  if (!healthyCheck) {
    //Tạo một Array chứa các thú cưng khỏe mạnh
    let healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].sterilized && petArr[i].dewormed) {
        // thêm thú cưng khỏe vào array
        healthyPetArr.push(petArr[i]);

        //show các thú cưng khỏe mạnh
      }
    }

    renderTableData(healthyPetArr);

    healthyBtn.textContent = 'Show All Pet';
    healthyCheck = true;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = 'Show Healthy Pet';
    healthyCheck = false;
  }
});

function renderBreed() {
  const breedDogs = breedArr.filter((breed) => breed.type === 'Dog');
  const breedCats = breedArr.filter((breed) => breed.type === 'Cat');
  breedInput.innerHTML = '<option>Select Breed</option>';
  let breed = typeInput.value;
  //nếu typeinput được là dog thì hiển thị
  if (breed === 'Dog') {
    breedDogs.forEach(function (a) {
      const option = document.createElement('option');
      option.innerHTML = `<option>${a.name}</option>`;
      breedInput.appendChild(option);
    });
  }
  //nếu typeinput được là cat thì hiển thị

  if (breed === 'Cat') {
    breedCats.forEach(function (a) {
      const option = document.createElement('option');
      option.innerHTML = `<option>${a.name}</option>`;
      breedInput.appendChild(option);
    });
  }
}
