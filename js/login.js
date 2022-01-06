const email = document.querySelector("form input[type='email']");
const password = document.querySelector("form input[type='password']");
const submitBut = document.querySelector("form button[type='submit']");
const alert = document.querySelector(".form-content .alert");

submitBut.addEventListener("click", (e) => {
  e.preventDefault();
  checkLogin();
});

function checkLogin() {
  if (
    localStorage.getItem("email") === email.value &&
    localStorage.getItem("password") === password.value
  ) {
    alert.style.display = "none";
    setTimeout(() => {
      location.href = "http://127.0.0.1:5500/index.html";
    }, 2000);
  } else {
    alert.style.display = "block";
  }
}
