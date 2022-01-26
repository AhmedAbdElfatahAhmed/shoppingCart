let userImg = document.querySelector(".profile img");
let userName = document.querySelector(".profile .user-name span");
let userEmail = document.querySelector(".profile .user-email span");
let productsQuantity = document.querySelector(".profile .quantity span");
let getUserImgFromLocalStorage = JSON.parse(localStorage.getItem("userImg"));
let getUserNameFromLocalStorage = JSON.parse(localStorage.getItem("userName"));
let getUserEmailFromLocalStorage = JSON.parse(localStorage.getItem("email"));
userImg.src = getUserImgFromLocalStorage;
userName.innerHTML = getUserNameFromLocalStorage;
userEmail.innerHTML = getUserEmailFromLocalStorage;
let allProducts = JSON.parse(localStorage.getItem("products"));
let createdProducts = allProducts.filter((item) => item.byUser);
if (createdProducts.length > 0) {
  productsQuantity.innerHTML = createdProducts.length;
} else {
  productsQuantity.parentElement.remove();
}
