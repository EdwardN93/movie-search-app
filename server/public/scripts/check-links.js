const showLogin = document.querySelector("#refLog");
const showSignUp = document.querySelector("#refSign");

const checkIfLoggedIn = () => {
  const token = localStorage.getItem("token");

  if (token) {
    showLogin.textContent = "Log out";
    showLogin.addEventListener("click", (e) => {
      localStorage.clear();
      window.location.href = `http://192.168.1.137:3000/index.html`;
    });
    showSignUp.remove();
  }
};

checkIfLoggedIn();
