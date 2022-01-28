// start logOut
const sign = document.querySelector("nav .sign");
const userLogout = document.querySelector("nav .user-info");
const userNameLogin = document.querySelector("nav .user-info .user-name");
const userImg = document.querySelector("nav .user-info img");
const logoutLink = document.querySelector("nav .user-info .log-out");
const userImgInLocalStorage = localStorage.getItem("userImg");
if (localStorage.getItem("userName")) {
  sign.remove();
  userLogout.style.display = "flex";
  userNameLogin.innerHTML = localStorage.getItem("userName");
  if (userImgInLocalStorage) {
    userImg.src = userImgInLocalStorage;
  } else {
    userImg.src = "images/user_avatar.jpg";
  }
}

logoutLink.addEventListener("click", () => {
  localStorage.clear();
});
// End logOut
