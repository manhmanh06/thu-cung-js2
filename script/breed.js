'use strict';
// get các El
const breedInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');

const submitBtn = document.getElementById('submit-btn');

const tableBodyEl = document.getElementById('tbody');

document
  .querySelector('body')
  .addEventListener('load', renderBreedTable(breedArr));
// lắng nghe sự kiện click vào submit
submitBtn.addEventListener('click', function () {
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };
  //biến kiểm tra dữ liệu
  const validate = validateData(data);
  function validateData() {
    let validate = true;

    for (let i = 0; i < breedArr.length; i++) {
      //Kiểm tra giống đã có hay chưa, duyệt kiểm tra trong mảng giống đã có giống đó hay chưa
      if (data.name === breedArr[i].name && data.type === breedArr[i].type) {
        alert('Giống này đã có');
        validate = false;
        break;
      }
    }
    //phải có dữ liệu nhaapf vào và giống phải được chọn
    if (data.name === '' || data.type === 'Select Type') {
      alert('Vui lòng nhập dữ liệu');
      validate = false;
    }
    //trả về giá trị của biến validate
    return validate;
  }
  //nếu  các dữ liệu nhập vào đủ đk thì thức hiện
  if (validate) {
    // thên dữ liệu nhập vào trong mảng breed
    breedArr.push(data);
    clearInput();
    //lưu dữ liệu xuống localStrorage
    saveToStorage(breed, breedArr);
    //render để hiển thị ra trang web
    renderBreedTable(breedArr);
  }
});
// tạo func xóa dữ liệu ô input khi người dùng nhấn submit
function clearInput() {
  breedInput.value = '';
  typeInput.value = 'Select Type';
}
//func để hiển thị dữ liệu
function renderBreedTable(arr) {
  tableBodyEl.innerHTML = '';
  arr.map((value, index) => {
    const trEl = document.createElement('tr');
    trEl.innerHTML = `
    <td scope="col">${index + 1}</td>
    <td scope="col">${value.name}</td>
    <td scope="col">${value.type}</td>
    <td scope="col"><button class="btn btn-danger" onclick="deleteBreed('${index}')">Delete</button></td>`;
    tableBodyEl.append(trEl);
  });
}
//xóa breed và cập nhật dữ liệu dưới local, render ra cho người dùng
function deleteBreed(index) {
  if (confirm(`Bạn thực sự muốn xóa breed : ${breedArr[index].name}`)) {
    breedArr.splice(index, 1);
    saveToStorage(breed, breedArr);
    renderBreedTable(breedArr);
  }
}
