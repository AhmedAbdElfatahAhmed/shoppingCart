// declar variables
const inputFile = document.querySelector(".creat-product input[type=file]");
const productNameEl = document.querySelector(".creat-product input[type=text]");
const productDescElm = document.querySelector(".creat-product textarea");
const productSizeElm = document.querySelector(".creat-product select");
const submitBtnElm = document.querySelector(".creat-product button");
let productSize, productImage;

// call function when event
productSizeElm.addEventListener("change", getProductSizeValue);
submitBtnElm.addEventListener("click", creatNewProduct);
inputFile.addEventListener("change", uploadImage);

// function to select size of product
function getProductSizeValue() {
  productSize = productSizeElm.value;
}

// function to create new product
function creatNewProduct(e) {
  e.preventDefault();
  if (
    inputFile.value &&
    productNameEl.value &&
    productDescElm.value &&
    productSizeElm.value
  ) {
    let allProducts = JSON.parse(localStorage.getItem("products"));
    let newProduct = {
      id: allProducts.length + 1,
      imgUrl: productImage,
      productName: productNameEl.value,
      description: productDescElm.value,
      size: productSize,
      quantity: 1,
      byUser: true,
    };
    allProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(allProducts));
    swal("success!", {
      title: `${productNameEl.value} item was added`,
      icon: "success",
      timer: 2000,
      buttons: false,
    });
    setTimeout(() => {
      location.href = "index.html";
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
    productImage = reader.result;
  };
  reader.onerror = () => {
    alert("Error!");
  };
}
