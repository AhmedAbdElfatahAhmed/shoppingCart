let userImgProfile = document.querySelector(".profile img");
let userName = document.querySelector(".profile .user-name span");
let userEmail = document.querySelector(".profile .user-email span");
let productsQuantity = document.querySelector(".profile .quantity span");
let getuserImgProfileFromLocalStorage = localStorage.getItem("userImg");
let getUserNameFromLocalStorage = localStorage.getItem("userName");
let getUserEmailFromLocalStorage = localStorage.getItem("email");
userImgProfile.src = getuserImgProfileFromLocalStorage;
if (getuserImgProfileFromLocalStorage) {
  userImgProfile.src = getuserImgProfileFromLocalStorage;
} else {
  userImgProfile.src = "images/user_avatar.jpg";
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
