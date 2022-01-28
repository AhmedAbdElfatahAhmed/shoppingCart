// start logOut
const sign = document.querySelector("nav .sign");
const userLogout = document.querySelector("nav .user-info");
const userNameLogin = document.querySelector("nav .user-info .user-name");
const logoutLink = document.querySelector("nav .user-info .log-out");

if (localStorage.getItem("userName")) {
  sign.remove();
  userLogout.style.display = "flex";
  userNameLogin.innerHTML = localStorage.getItem("userName");
}

logoutLink.addEventListener("click", () => {
  localStorage.clear();
});
// End logOut
