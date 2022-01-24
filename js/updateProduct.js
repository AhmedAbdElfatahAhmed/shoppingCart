// declar variables
const inputFile = document.querySelector(".creat-product input[type=file]");
const productNameEl = document.querySelector(".creat-product input[type=text]");
const productDescElm = document.querySelector(".creat-product textarea");
const productSizeElm = document.querySelector(".creat-product select");
const submitBtnElm = document.querySelector(".creat-product button");
let productImage;
let allProducts = JSON.parse(localStorage.getItem("products"));
let editProductID = JSON.parse(localStorage.getItem("editProductID"));
let targetProduct = allProducts.find((item) => item.id === editProductID);

// call function when event
submitBtnElm.addEventListener("click", updateProduct);
inputFile.addEventListener("change", uploadImage);

// function to get product data before update
(function getProductDataBeforeUpdate() {
  productNameEl.value = targetProduct.productName;
  productDescElm.value = targetProduct.description;
  productSizeElm.value = targetProduct.size;
})();

// function to update product
function updateProduct(e) {
  e.preventDefault();
  if (
    inputFile.value &&
    productNameEl.value &&
    productDescElm.value &&
    productSizeElm.value
  ) {
    targetProduct.imgUrl = productImage;
    targetProduct.productName = productNameEl.value;
    targetProduct.description = productDescElm.value;
    targetProduct.size = productSizeElm.value;

    localStorage.setItem("products", JSON.stringify(allProducts));

    swal("success!", {
      title: "product update successfully ",
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
