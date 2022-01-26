// declar variables
const inputFile = document.querySelector(".edit-profile input[type=file]");
const inputNameEl = document.querySelector(".edit-profile input[type=text]");
const inputEmailElm = document.querySelector(".edit-profile input[type=email]");
const submitBtnElm = document.querySelector(".edit-profile button");
let userImage;
let getUserNameFromLocalStorage = JSON.parse(localStorage.getItem("userName"));
let getUserEmailFromLocalStorage = JSON.parse(localStorage.getItem("email"));
inputNameEl.value = getUserNameFromLocalStorage;
inputEmailElm.value = getUserEmailFromLocalStorage;

// call function when event
submitBtnElm.addEventListener("click", editProfileInfo);
inputFile.addEventListener("change", uploadImage);

// function to create new product
function editProfileInfo(e) {
  e.preventDefault();
  if (inputFile.value && inputNameEl.value && inputEmailElm.value) {
    localStorage.setItem("userImg", JSON.stringify(userImage));
    localStorage.setItem("userName", JSON.stringify(inputNameEl.value));
    localStorage.setItem("email", JSON.stringify(inputEmailElm.value));

    swal("success!", {
      title: `Your profile edit successfully`,
      icon: "success",
      timer: 2000,
      buttons: false,
    });
    setTimeout(() => {
      location.href = "profile.html";
    }, 2100);
  } else {
    swal("warning!", {
      title: "You must fill all inputs",
      icon: "warning",
      timer: 2000,
      buttons: false,
    });
  }
}

function uploadImage() {
  let chossenFile = this.files[0];
  fileTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (fileTypes.indexOf(chossenFile.type) === -1) {
    swal("warning!", {
      title: "This type of File Not Supported",
      icon: "warning",
      timer: 2500,
      buttons: false,
    });
    inputFile.value = "";
    return;
  }
  getImageBase64(chossenFile);
}

function getImageBase64(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    userImage = reader.result;
  };
  reader.onerror = () => {
    alert("Error!");
  };
}
