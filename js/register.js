const userName = document.querySelector("form input[type='text']");
const email = document.querySelector("form input[type='email']");
const password = document.querySelector("form input[type='password']");
const submitBut = document.querySelector("form button[type='submit']");
const alert = document.querySelector(".form-content .alert");

submitBut.addEventListener("click", (e) => {
  e.preventDefault();
  checkRegister();
});

function checkRegister() {
  if (!userName.value || !email.value || !password.value) {
    alert.style.display = "block";
  } else {
    setItemsInLocalStorage();
    alert.style.display = "none";
    location.href = "http://127.0.0.1:5500/login.html?";
  }
}

function setItemsInLocalStorage() {
  localStorage.setItem("userName", userName.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);
}
