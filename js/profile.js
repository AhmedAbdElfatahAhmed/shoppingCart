let userImg = document.querySelector(".profile img");
let userName = document.querySelector(".profile .user-name span");
let userEmail = document.querySelector(".profile .user-email span");
let productsQuantity = document.querySelector(".profile .quantity span");
let getUserImgFromLocalStorage = localStorage.getItem("userImg");
let getUserNameFromLocalStorage = localStorage.getItem("userName");
let getUserEmailFromLocalStorage = localStorage.getItem("email");
userImg.src = getUserImgFromLocalStorage;
if (getUserImgFromLocalStorage) {
  userImg.src = getUserImgFromLocalStorage;
} else {
  userImg.src = "images/user_avatar.jpg";
}
userName.innerHTML = getUserNameFromLocalStorage;
userEmail.innerHTML = getUserEmailFromLocalStorage;
let allProducts = JSON.parse(localStorage.getItem("products"));
let createdProducts = allProducts.filter((item) => item.byUser);
if (createdProducts.length > 0) {
  productsQuantity.innerHTML = createdProducts.length;
} else {
  productsQuantity.parentElement.remove();
}
