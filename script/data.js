'use strict';
const inputfile = document.querySelector('#input-file');
const impBtn = document.querySelector('#import-btn');
const expBtn = document.querySelector('#export-btn');

function saveStaticDataToFile() {
  if (confirm('Tải dữ liệu xuống ở máy ?')) {
    //lấy dữ liệu hiện có dưới localStorage
    const pets = JSON.parse(getFromStorage(key));
    //Tạo đối tượng blod để lưu trữ nội dung Json
    const blob = new Blob([JSON.stringify(pets)], { type: 'application/json' });
    //tải File xuống
    saveAs(blob, 'pets.json');
  }
}

function previewFile() {
  // if (confirm('Bạn muốn tải dữ liệu lên hệ thống ?')) {
  //Lấy file từ Input
  const file = inputfile.files[0];
  // Đọc nội dung file
  const fileReader = new FileReader();
  fileReader.onload = () => {
    // dữ liệu được chuyển đổi từ chuỗi JSON sang JavaScript object thông qua hàm JSON.parse().
    const importedPets = JSON.parse(fileReader.result);
    // dữ liệu đã lưu trữ trong localStorage được lấy ra và chuyển sang mảng
    //(nếu dữ liệu chưa tồn tại thì sẽ tạo một mảng rỗng)
    const currentPets = JSON.parse(localStorage.getItem(key)) || [];
    // Mỗi thú cưng trong dữ liệu được import sẽ được kiểm tra xem đã tồn tại trong mảng hiện tại chưa thông qua việc so sánh id.
    // Nếu thú cưng đã tồn tại thì sẽ ghi đè lên thú cưng cũ, ngược lại sẽ được thêm mới vào mảng.
    importedPets.forEach((importedPet) => {
      const index = currentPets.findIndex(
        (currentPet) => currentPet.id === importedPet.id
      );
      if (index !== -1) {
        currentPets[index] = importedPet;
      } else {
        currentPets.push(importedPet);
      }
    });
    // Cuối cùng, mảng dữ liệu được lưu trữ lại trong localStorage thông qua hàm JSON.stringify()
    //và trang web sẽ được tải lại để hiển thị dữ liệu mới được cập nhật.
    localStorage.setItem(key, JSON.stringify(currentPets));
    location.reload();
  };
  if (file) {
    if (confirm('Bạn muốn tải dữ liệu lên hệ thống ?')) {
      fileReader.readAsText(inputfile.files[0]);
    }
  } else {
    alert('Vui lòng chọn một File để tải lên !');
  }
  // }
}
