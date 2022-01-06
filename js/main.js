const sign = document.querySelector("nav .sign");
const userLogout = document.querySelector("nav .user-logout");
const userNameLogin = document.querySelector("nav .user-logout .user");
const logoutLink=document.querySelector("nav .user-logout .log-out");

if (localStorage.getItem("userName")) {
  sign.remove();
  userLogout.style.display = "flex";
  userNameLogin.innerHTML=localStorage.getItem("userName")
}

logoutLink.addEventListener("click",()=>
{
    localStorage.clear();
})